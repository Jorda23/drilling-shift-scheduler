import { render } from '@testing-library/react';
import { AlertsPanel } from "../AlertsPanel";

describe('AlertsPanel', () => {
  it('should render nothing when errors array is empty', () => {
    const { container } = render(<AlertsPanel errors={[]} />);

    expect(container.firstChild).toBeNull();
  });
});
