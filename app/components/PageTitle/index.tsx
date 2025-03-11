import React from 'react';

type PageTitleProps = {
  title: string;
};

const PageTitle = (props: PageTitleProps) => {
  const { title } = props;
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[36px]">{title}</h1>
    </div>
  );
};

export default PageTitle;
