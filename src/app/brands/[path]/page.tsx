
interface Params {
  params: { path: string };
}

export default async function page({ params: { path } }: Params) {

  return <h1 className="container sections__title">Your brands is {path}</h1>
}
