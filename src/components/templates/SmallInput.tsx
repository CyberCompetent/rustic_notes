import React from 'react';

interface ExporteeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const exportee: React.FC<ExporteeProps> = ({ placeholder = '', ...rest }) => {
  return (
    <input
      type="text"
      className="p-2 border border-gray-400 rounded bg-gray-200 text-gray-800"
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default exportee;
