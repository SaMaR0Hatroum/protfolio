import * as RadixTooltip from '@radix-ui/react-tooltip';

export const Tooltip = () => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger />
        <RadixTooltip.Content>
          <RadixTooltip.Arrow /> Add to library
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
