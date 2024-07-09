{
  description = "Devtools for site";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, ... }@inputs:
    let
      pkgs = import nixpkgs {
        system = "x86_64-linux";
        config.allowUnfree = true;
      };
      # Dev time (developing tools)
      devInputs = with pkgs; [
        typescript
        nodePackages.typescript-language-server
      ];
      # Build time (build tools; header libs)
      nativeBuildInputs = with pkgs; [
      ];
      # Run time (libs to link with)
      buildInputs = with pkgs; [
      ];

    in {
    # Utilized by `nix develop`
    devShell.x86_64-linux = pkgs.mkShell.override { stdenv = pkgs.clangStdenv; } {
      name = "webapps";
      inherit buildInputs;
      nativeBuildInputs = nativeBuildInputs ++ devInputs;
    };
  };
}
