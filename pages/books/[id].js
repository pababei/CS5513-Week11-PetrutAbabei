import Link from "next/link";
import Layout from "../../components/layout";
import { getAllBookIds, getBookData } from "../../lib/data";

export async function getStaticProps({ params }) {
  const itemData = await getBookData(params.id);
  return {
    props: {
      itemData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllBookIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      <h1>Book Info</h1>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Author: {itemData.author}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Genre: {itemData.genre}
          </h6>
          <Link href={itemData.website} className="card-link">
            {itemData.website}
          </Link>
        </div>
      </article>
    </Layout>
  );
}
