import Link from "next/link";
import Layout from "../../components/layout";
import { getAllIds, getData, getBooksReadById } from "../../lib/data";

export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  const readBooksData = await getBooksReadById(params.id);
  return {
    props: {
      itemData,
      readBooksData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ itemData, readBooksData }) {
  return (
    <Layout>
      <h1>Member Info</h1>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {itemData.phone}
          </h6>
          <p className="card-text">{itemData.birthdate}</p>
          <a href="#" className="card-link">
            {itemData.email}
          </a>
        </div>
      </article>
      <h1>Books Recommended</h1>
      <article className="card col-6">
        <div className="list-group">
          {readBooksData.map(({ id, name, author }) => (
            <Link
              key={id}
              href={`/books/${id}`}
              className="list-group-item list-group-item-action"
            >
              {name} by {author}
            </Link>
          ))}
        </div>
      </article>
    </Layout>
  );
}
