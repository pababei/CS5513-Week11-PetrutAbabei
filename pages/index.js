// Next.js will always look for index file
import Link from "next/link";
import Layout from "../components/layout";
import { getSortedList } from "../lib/data";

// define getStaticProps()
export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: { allData },
  };
}

export default function Home({ allData }) {
  return (
    <Layout>
      <h1>Wordpress Headless App Demo</h1>
      <div className="list-group">
        {allData.map(({ id, title }) => (
          <Link
            key={id}
            href={`/posts/${id}`}
            className="list-group-item list-group-item-action"
          >
            {title}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
