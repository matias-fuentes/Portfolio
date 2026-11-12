import {
  useState,
  useEffect,
  useRef,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';

interface HTMLElementRef {
  current: HTMLElement | null;
}

interface SlideUpProps {
  delay?: 1 | 2 | 3;
  className?: string;
  children: ReactElement;
}

// Component to animate elements with the "slideUp" and "slideUpVisible" classes as soon as they enter the viewport.
const SlideUp = ({ children, className = '', delay }: SlideUpProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (!isValidElement(children)) return children;

  const delayClass = delay ? `delay-${delay}` : '';

  // Checks if children has a className prop defined. If it does, we assign its value to childClassName.
  let childClassName = '';
  const childProps = children.props;
  if (
    childProps &&
    typeof childProps === 'object' &&
    'className' in childProps &&
    typeof childProps.className === 'string'
  ) {
    childClassName = childProps.className;
  }

  const mergedClassName =
    `${childClassName} slideUp ${isVisible ? 'slideUpVisible' : ''} ${delayClass} ${className}`.trim();

  // Checks if childRef.current is of type HTMLElement | null.
  const isHTMLElementRef = (ref: unknown): ref is HTMLElementRef => {
    return (
      typeof ref === 'object' &&
      ref !== null &&
      'current' in ref &&
      (ref.current === null || ref.current instanceof HTMLElement)
    );
  };

  // Handle ref merging in case the child already has a ref attached.
  const handleRef = (node: HTMLElement | null) => {
    elementRef.current = node;
    if (childProps && typeof childProps === 'object' && 'ref' in childProps) {
      const childRef = childProps.ref;

      if (typeof childRef === 'function') {
        childRef(node);
      } else if (isHTMLElementRef(childRef)) {
        childRef.current = node;
      }
    }
  };

  return cloneElement(children as ReactElement<any>, {
    ref: handleRef,
    className: mergedClassName,
  });
};

export default SlideUp;
