import Layout from "../../components/layout";
import { getAllIds, getItemData } from "../../lib/data";

export async function getStaticProps({ params }) {
  const itemData = await getItemData(params.id);
  return {
    props: {
      itemData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {itemData.author}
          </h6>
          <p className="card-text">{itemData.content}</p>
        </div>
      </article>
    </Layout>
  );
}
