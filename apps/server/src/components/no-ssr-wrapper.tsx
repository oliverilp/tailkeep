import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

function NoSsrWrapper(props: { children: ReactElement }) {
  return props.children;
}

export default dynamic(() => Promise.resolve(NoSsrWrapper), {
  ssr: false
});
