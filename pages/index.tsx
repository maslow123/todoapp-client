import type { InferGetStaticPropsType } from "next";

export async function getStaticProps() {

  return {
    props: {
    },
    revalidate: 4 * 60 * 60 // 4 hours
  };
}
export default function Home({}: InferGetStaticPropsType<typeof getStaticProps>) {
    
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}