import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import { useClipboard } from 'use-clipboard-copy';
import { Tooltip } from './Tooltip';

const diffSymbols = {
  '-': '#133929',
  '+': '#0f7bfe40',
};

// interface CodeBlockProps {
//   children: React.ReactNode | null | undefined;
//   className: string;
// }

// TODO: add types
// @ts-ignore
export const CodeBlock = ({ children, className = '' }) => {
  const clipboard = useClipboard({ copiedTimeout: 600 });

  const language = className.replace(/language-/, '');
  return (
    <div className="relative group">
      <div className="absolute top-1 right-0 h-8 z-10 hidden group-hover:flex items-center mb-10 pr-4">
        <div className="relative flex -mr-2">
          <button
            type="button"
            onClick={() => clipboard.copy(children.trim())}
            className="text-gray-200 hover:text-gray-100"
          >
            {clipboard.copied ? (
              <div>
                <CheckIcon className="w-5 h-5 inline stroke-green-300  space-x-2 items-center" />{' '}
                Copied!
              </div>
            ) : (
              <CopyIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        // @ts-ignore
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            className={` rounded-lg relative shadow-lg group overflow-x-scroll  px-6 py-7   ${className}`}
            style={style}
          >
            <code ref={clipboard.target}>
              {tokens.map((line, i) => {
                let lineClass = {
                  backgroundColor: '',
                };
                let diffSymbol = '';
                if (
                  (line[0] &&
                    line[0].content.length &&
                    (line[0].content[0] === '+' ||
                      line[0].content[0] === '-')) ||
                  (line[0] &&
                    line[0].content === '' &&
                    line[0].content[1] !== '+' &&
                    line[0].content[1] !== '-')
                ) {
                  diffSymbol =
                    line[0] && line[0].content.length
                      ? line[0].content[0]
                      : line[1].content;
                  lineClass = {
                    // @ts-ignore
                    backgroundColor: diffSymbols[diffSymbol],
                  };

                  if (
                    line[0] &&
                    line[0].content.length &&
                    (line[0].content[0] === '+' || line[0].content[0] === '-')
                  ) {
                    line[0].content = '';
                  }

                  if (
                    (line[1] &&
                      line[1].content.length &&
                      line[1].content === '-') ||
                    line[1].content === '+'
                  ) {
                    line[1].content = '';
                  }
                }

                const lineProps = getLineProps({ line, key: i });
                lineProps.style = { ...lineClass };

                return (
                  <div key={i}>
                    <span {...lineProps}>
                      {line.map((token, key) => {
                        return (
                          <span key={key} {...getTokenProps({ token, key })} />
                        );
                      })}
                    </span>
                  </div>
                );
              })}
            </code>
          </div>
        )}
      </Highlight>
    </div>
  );
};
