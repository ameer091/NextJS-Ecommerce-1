// withDemoMode.js

import { useDemo } from './demoContext';

function withDemoMode(WrappedComponent) {
  return function(props) {
    const isDemoMode = useDemo();
    return <WrappedComponent {...props} isDemoMode={isDemoMode} />;
  };
}
