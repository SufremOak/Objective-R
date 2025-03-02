# Objective-R

Objective-R syntax highlight and language server for VSCode

A hello world for you:
```rust
#use Foundation;

implementation Hello: RSObject {
    let message: String('Hello, World!');
    fn new() -> Self {
        Self {
            message: "Hello, World!".to_string(),
        }
    }
}

fn main(%invoque Hello:Impl) {
    RSLog!(message);
    return !NULL.0;
}
```