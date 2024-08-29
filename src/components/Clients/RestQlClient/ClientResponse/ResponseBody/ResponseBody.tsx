'use client';

interface Props {
  body: string;
}

function ResponseBody(prop: Props) {
  return (
    <div>
      <p>{prop.body}</p>
    </div>
  );
}

export default ResponseBody;
