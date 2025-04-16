// pages/about.tsx
import { NextSeo } from 'next-seo';

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title='About Us'
        description='Learn more about our team and mission.'
        canonical='https://my-seo-app.com/about'
      />
      <main className='p-8'>
        <h1 className='text-4xl font-bold'>About Us</h1>
        <p>We're a team that cares about SEO.</p>
      </main>
    </>
  );
}
