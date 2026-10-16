import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { getMediaUrl, extractKeyPoints } from '@/lib/utils';

interface HeroSectionProps { leadStory: Article; secondaryStories: Article[]; }

export default function HeroSection({ leadStory, secondaryStories }: HeroSectionProps) {
  const leadImage = getMediaUrl(leadStory.coverImage);
  const keyPoints = extractKeyPoints(leadStory).slice(0, 3);

  return (
    <section className="hero-package" aria-labelledby="top-story-heading">
      <div className="hero-intro">
        <div><span className="edition-label">THE DAILY BRIEFING</span><p>Your world. In focus.</p></div>
        <span className="edition-note">U.S. headlines. Global perspective.</span>
      </div>
      <div className="hero-grid">
        <article className={`hero-lead${leadImage ? '' : ' hero-lead-no-image'}`}>
          <Link href={`/article/${leadStory.slug}`} className="hero-lead-link">
            {leadImage && <Image className="hero-cover" src={leadImage} alt={leadStory.coverImage?.alt || leadStory.title} fill priority sizes="(max-width: 900px) 100vw, 66vw" />}
            <div className="hero-lead-content">
              <div className="hero-lead-labels"><span className="hero-top-label">TOP STORY</span><span>{leadStory.category?.name || 'News'}</span>{leadStory.isVideo && <span>▶ {leadStory.videoDuration || 'Watch'}</span>}</div>
              <h1 id="top-story-heading" className="story-title">{leadStory.title}</h1>
              <p className="story-summary">{leadStory.excerpt}</p>
              <div className="hero-lead-bottom"><span>{leadStory.readTime || 3} min read</span><span className="hero-read-story">Read the full story <span aria-hidden="true">↗</span></span></div>
            </div>
          </Link>
        </article>
        {secondaryStories.length > 0 && (
          <aside className="hero-briefing" aria-labelledby="briefing-heading">
            <div className="briefing-heading"><h2 id="briefing-heading">On the radar</h2><span>THE LATEST</span></div>
            <div className="hero-side-stack">
              {secondaryStories.slice(0, 4).map((story, index) => {
                const image = getMediaUrl(story.coverImage);
                return (
                  <article className="hero-side-story" key={story.id}>
                    <div><span className="story-kicker"><span className="briefing-number">0{index + 1}</span>{story.category?.name || 'News'}</span><Link href={`/article/${story.slug}`}><h3 className="story-title">{story.title}</h3></Link><div className="story-meta"><span>{story.readTime || 3} min read</span></div></div>
                    {image && <Link href={`/article/${story.slug}`} className="media-frame" tabIndex={-1} aria-hidden="true"><Image src={image} alt="" fill sizes="80px" /></Link>}
                  </article>
                );
              })}
            </div>
            <Link href="/category/world" className="briefing-more">Explore all headlines <span aria-hidden="true">→</span></Link>
          </aside>
        )}
      </div>
      {keyPoints.length > 0 && (
        <div className="key-developments"><strong><span aria-hidden="true">↳</span> THE BIG PICTURE</strong><ul>{keyPoints.map((point, index) => <li key={index}>{point}</li>)}</ul></div>
      )}
    </section>
  );
}
