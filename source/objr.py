import re
import typer

app = typer.Typer()

class ObjectiveRCompiler:
    def __init__(self):
        self.output = []

    def compile(self, code):
        self.output = []
        lines = code.split('\n')
        for line in lines:
            self.parse_line(line)
        return '\n'.join(self.output)

    def parse_line(self, line):
        # Remove comments
        line = re.sub(r'#.*', '', line).strip()
        if not line:
            return

        # Handle use statements
        if line.startswith('#use'):
            self.output.append(self.handle_use(line))
        # Handle framework statements
        elif line.startswith('#framework'):
            self.output.append(self.handle_framework(line))
        # Handle implementation
        elif line.startswith('implementaton'):
            self.output.append(self.handle_implementation(line))
        # Handle function main
        elif line.startswith('fn main'):
            self.output.append(self.handle_main(line))
        # Handle RSPrintln macro
        elif 'RSPrintln!' in line:
            self.output.append(self.handle_rsprintln(line))
        # Handle variable declarations
        elif re.match(r'let\s+\w+\s*=', line):
            self.output.append(self.handle_variable_declaration(line))
        # Handle function definitions
        elif re.match(r'fn\s+\w+\s*\(', line):
            self.output.append(self.handle_function_definition(line))
        else:
            self.output.append(line)

    def handle_use(self, line):
        lib = re.findall(r'#use\s+"([^"]+)"', line)
        if lib:
            return f'use {lib[0]};'
        return line

    def handle_framework(self, line):
        framework = re.findall(r'#framework\s+"([^"]+)"', line)
        if framework:
            return f'// Framework: {framework[0]}'
        return line

    def handle_implementation(self, line):
        match = re.match(r'implementaton\s+(\w+):\s*(\w+)\s*{', line)
        if match:
            class_name, base_class = match.groups()
            return f'impl {class_name} for {base_class} {{'
        return line

    def handle_main(self, line):
        match = re.match(r'fn main\(%invoque\s+(\w+):(\w+)\);', line)
        if match:
            class_name, method = match.groups()
            return f'fn main() {{ {class_name}::{method}(); }}'
        return line

    def handle_rsprintln(self, line):
        match = re.match(r'RSPrintln!\(([^)]+)\);', line)
        if match:
            content = match.groups()[0]
            return f'println!({content});'
        return line

    def handle_variable_declaration(self, line):
        match = re.match(r'let\s+(\w+)\s*=\s*(.*);', line)
        if match:
            var_name, value = match.groups()
            return f'let {var_name} = {value};'
        return line

    def handle_function_definition(self, line):
        match = re.match(r'fn\s+(\w+)\s*\(([^)]*)\)\s*{', line)
        if match:
            func_name, params = match.groups()
            return f'fn {func_name}({params}) {{'
        return line

@app.command()
def compile(file: str):
    try:
        with open(file, 'r') as f:
            code = f.read()
    except FileNotFoundError:
        typer.echo(f"File not found: {file}")
        raise typer.Exit(code=1)

    compiler = ObjectiveRCompiler()
    rust_code = compiler.compile(code)
    typer.echo(rust_code)

if __name__ == "__main__":
    app()
