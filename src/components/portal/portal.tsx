import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DEFAULT_WRAPPER_ID = 'react-portal-root';

interface PortalProps {
  children: React.ReactNode;
  wrapperElementId?: string;
}

const Portal: React.FC<PortalProps> = ({
  children,
  wrapperElementId = DEFAULT_WRAPPER_ID,
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperElementId);
    if (!element) {
      element = document.createElement('div');
      element.id = wrapperElementId;
      document.body.appendChild(element);
    }
    setWrapperElement(element);
  }, [wrapperElementId]);

  if (!wrapperElement) {
    return null;
  }

  return createPortal(children, wrapperElement);
};

export default Portal;