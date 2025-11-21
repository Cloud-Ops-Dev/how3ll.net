import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Recommendations from '@/components/Recommendations';
import { getLinkedInData } from '@/lib/linkedin-data';

export default async function Home() {
  const data = await getLinkedInData();

  return (
    <main className="w-full bg-white">
      <Hero profile={data.profile} />
      <Experience positions={data.positions} />
      <Skills skills={data.skills} topCount={20} />
      <Recommendations recommendations={data.recommendations} limit={6} />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p>© 2025 {data.profile.firstName} {data.profile.lastName}. All rights reserved.</p>
          <p className="text-sm mt-2">
            Cloud Operations | DevOps | Security | Process Automation
          </p>
        </div>
      </footer>
    </main>
  );
}
