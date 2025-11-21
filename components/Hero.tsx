import { Profile } from '@/lib/linkedin-data';

export interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {profile.firstName} <span className="text-blue-400">{profile.lastName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 font-semibold mb-6">
            {profile.headline}
          </p>
        </div>

        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {profile.summary.substring(0, 300)}...
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#experience"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
          >
            View Experience
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-blue-400 hover:bg-blue-400 hover:bg-opacity-10 rounded-lg font-semibold transition"
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-12 text-sm text-slate-400">
          <p>{profile.location}</p>
        </div>
      </div>
    </section>
  );
}
