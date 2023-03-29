import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Image from 'next/image';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className='font-bold'>Welcome on my new website</p>
        <p class="hidden">
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn" target="_blank">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, image }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <section className="flex flex-row bg-slate-50 rounded-lg overflow-hidden transition-all shadow hover:shadow-lg hover:scale-[1.01]">
                  <Image 
                    src={image}
                    alt={`Image : ${title}`}
                    width= {120}
                    height= {120}
                  />
                  <div className="p-4">
                    <h3>{title}</h3>
                    <small className={utilStyles.lightText}>
                      <Date dateString={date} />
                    </small>
                  </div>
                </section>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}