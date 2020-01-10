with import <nixpkgs> { }; 

runCommand "dummy" {
    buildInputs = [ diesel-cli gcc nodejs openssl pkgconfig rustup sqlite ];
} ""
