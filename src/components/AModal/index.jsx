import { Modal } from 'antd';
import { cloneElement } from 'react';

export default function AModal({ visible, onCancel, children, ...others }) {
  const modalRender = (comps) => {
    return cloneElement(comps, {
      ...comps.props,
      style: {
        padding: 0,
      },
    });
  };
  return (
    <Modal open={visible} width={480} modalRender={modalRender} onCancel={onCancel} {...others}>
      {children}
    </Modal>
  );
}
