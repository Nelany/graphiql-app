'use client';

interface Props {
  body: string;
}

const ResponseBody: React.FC<Props> = (prop) => {
  return (
    <div>
      <p>{prop.body}</p>
    </div>
  );
};

export default ResponseBody;
