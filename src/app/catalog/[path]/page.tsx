interface Params {
  params: {
    path: string;
  };
}

export default function CategoryPage({ params: { path } }: Params) {
  return <ul>{params.path}</ul>;
}
