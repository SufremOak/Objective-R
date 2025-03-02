---
title: Installing Objective-R
description: Get started with Objective-R development environment
sidebar:
  order: 1
---

# Installation

## Prerequisites

- Rust toolchain (1.75.0 or later)
- Python 3.8 or later
- Git

## Quick Install

```bash
pip install objective-r
```

## Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/sufremoak/objective-r
cd objective-r
```

2. Install dependencies:
```bash
pip install -e .
```

## Verifying Installation

Create a file `hello.or`:
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

Compile and run:
```bash
objr compile hello.or
./hello
```