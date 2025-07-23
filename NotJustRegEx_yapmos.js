// NotJustRegEx.js
// Scratch Extension that does simple regex
// Unsandbox: Optional! (You can leave sandboxed)
// GH: IcedLua
// PM: sprout
// License: MIT

(function (Scratch) {
  const Unsandboxed = Scratch.extensions.unsandboxed

  function splitArgsWithEscapedCommas(input) {
    const parts = input.split(/(?<!\\),/);

    return parts.map(s => s.replace(/\\,/g, ',').trim());
  } 

  class extension {
    getInfo() {
      return {
        id: 'JustRegExIcedLua',
        name: 'Not Just RegEx',
        color1: "#8706cc",
        color2: "#a600ff",
        color3: "#c75eff",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'RegEx blocks'
          },
          {
            opcode: 'regexCheckPatternFlag',
            blockType: Scratch.BlockType.REPORTER,
            text: 'check [INPUT] for RegEx /[PATTERN]/[FLAGS]',
            blockShape: Scratch.BlockShape.PLUS,
            arguments: {
              PATTERN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ".+"
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gi"
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!"
              }
            }
          },
          {
            opcode: 'regexReplaceMatchesWith',
            blockType: Scratch.BlockType.REPORTER,
            text: 'replace RegEx /[PATTERN]/[FLAGS] in [INPUT] with [REPLACEMENT]',
            arguments: {
              PATTERN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "world."
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gi"
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!"
              },
              REPLACEMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "penguins!"
              }
            }
          },
          {
            opcode: 'checkIfRegExMatchesInput',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'does [INPUT] match /[PATTERN]/[FLAGS]?',
            arguments: {
              PATTERN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "world"
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gi"
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!"
              }
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Luau styled blocks'
          },
          {
            opcode: 'populateTemplateWithInputs',
            blockType: Scratch.BlockType.REPORTER,
            text: 'format [TEMPLATE] with [REPLACEMENT]',
            arguments: {
              TEMPLATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello %s"
              },
              REPLACEMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Penguins!"
              }
            }
          },
          {
            opcode: 'splitInputByDelimiter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'split [INPUT] by [DELIMITER]',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Scratch, Turbowarp, PenguinMod"
              },
              DELIMITER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ", "
              }
            }
          }
        ],
      };
    }

    regexCheckPatternFlag(args) {
      const input = args.INPUT;

      let regex;
      try {
        regex = new RegExp(args.PATTERN, args.FLAGS || '');
      } catch (e) {
        return JSON.stringify({ error: 'Invalid pattern' });
      }

      const result = {
        match: [],
        captured: []
      };

      if ((args.FLAGS || '').includes('g')) {
        const matches = [...input.matchAll(regex)];

        for (const match of matches) {
          result.match.push(match[0]);
          for (let i = 1; i < match.length; i++) {
            result.captured.push(match[i]);
          }
        }
      } else {
        const match = regex.exec(input);
        if (match) {
          result.match.push(match[0]);
          for (let i = 1; i < match.length; i++) {
            result.captured.push(match[i]);
          }
        }
      }

      return JSON.stringify(result);
    }

    regexReplaceMatchesWith(args) {
      const input = args.INPUT;
      let regex
      try {
        regex = RegExp(args.PATTERN, args.FLAGS);
      } catch (error) {
        return JSON.stringify({ error: 'Invalid pattern' });
      }
      const result = input.replace(regex, args.REPLACEMENT);

      return result
    }

    checkIfRegExMatchesInput(args) {
      const input = args.INPUT;
      let regex
      try {
        regex = RegExp(args.PATTERN, args.FLAGS);
      } catch (error) {
        return JSON.stringify({ error: 'Invalid pattern' });
      }
      const result = regex.test(input);

      return result
    }

    populateTemplateWithInputs(args) {
      const values = splitArgsWithEscapedCommas(args.REPLACEMENT);
      let i = 0;
      return args.TEMPLATE.replace(/%s/g, () => values[i++] ?? '%s');
    }

    splitInputByDelimiter(args) {
      return JSON.stringify(args.INPUT.split(args.DELIMITER))
    }
  }

  Scratch.extensions.register(new extension());
})(Scratch);
