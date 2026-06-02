<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

import AppShell from './components/AppShell.vue'
import Sidebar from './components/Sidebar.vue'
import EditorTabs from './components/EditorTabs.vue'
import SectionCard from './components/SectionCard.vue'
import CodeBlock from './components/CodeBlock.vue'
import SkillBadge from './components/SkillBadge.vue'
import MetricCard from './components/MetricCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import Icon from './components/Icon.vue'

import { profile, techStack, stackCategoryMeta } from './data/profile.js'
import { experience } from './data/experience.js'
import { aiLeverage, aiMetrics } from './data/aiLeverage.js'
import { projects } from './data/projects.js'

// Resume path — drop resume.pdf into /public to make this live.
const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`

const tabs = [
  { id: 'profile', file: 'profile.ts' },
  { id: 'stack', file: 'stack.ts' },
  { id: 'experience', file: 'experience.ts' },
  { id: 'ai', file: 'ai-leverage.ts' },
  { id: 'projects', file: 'projects.ts' },
  { id: 'contact', file: 'contact.ts' },
]

const active = ref('profile')
const activeFile = computed(
  () => tabs.find((t) => t.id === active.value)?.file ?? 'profile.ts',
)

function go(id) {
  const el = document.getElementById(`s-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const stackCats = Object.keys(techStack).map((key) => ({
  key,
  label: stackCategoryMeta[key].label,
  icon: stackCategoryMeta[key].icon,
  items: techStack[key],
}))

let spy, revealer
onMounted(() => {
  const root = document.querySelector('.shell__editor')

  // Scroll-spy → active tab
  spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.dataset.id
      })
    },
    { root, rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  )
  document.querySelectorAll('[data-id]').forEach((el) => spy.observe(el))

  // Reveal-on-scroll
  revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          e.target.classList.remove('pre-view')
          revealer.unobserve(e.target)
        }
      })
    },
    { root, threshold: 0.12 },
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.classList.add('pre-view')
    revealer.observe(el)
  })
})
onBeforeUnmount(() => {
  spy && spy.disconnect()
  revealer && revealer.disconnect()
})
</script>

<template>
  <AppShell :active-file="activeFile">
    <!-- SIDEBAR -->
    <template #sidebar>
      <Sidebar :tabs="tabs" :active="active" @navigate="go" />
    </template>

    <!-- TABS -->
    <template #tabs>
      <EditorTabs :tabs="tabs" :active="active" @select="go" />
    </template>

    <!-- EDITOR CONTENT -->
    <!-- ══════════════════ 1 · PROFILE / HERO ══════════════════ -->
    <section id="s-profile" data-id="profile" class="section hero">
      <div class="hero__grid">
        <div class="hero__intro reveal">
          <p class="eyebrow">// senior full stack software engineer</p>
          <h1 class="hero__name">
            {{ profile.name }}<span class="hero__caret">|</span>
          </h1>
          <p class="hero__role mono">
            <span class="tok-key">const</span>
            <span class="tok-prop"> role</span>
            <span class="tok-punct"> = </span>
            <span class="tok-str">"{{ profile.role }}"</span>
          </p>
          <p class="hero__summary">{{ profile.summary }}</p>

          <div class="hero__stats">
            <div class="stat">
              <span class="stat__num mono">14+</span>
              <span class="stat__lbl">years building<br />production systems</span>
            </div>
            <div class="stat">
              <span class="stat__num mono">5</span>
              <span class="stat__lbl">engineering<br />teams & companies</span>
            </div>
            <div class="stat">
              <span class="stat__num mono">∞</span>
              <span class="stat__lbl">AI-assisted<br />workflows shipped</span>
            </div>
          </div>

          <div class="hero__cta">
            <a class="btn btn--primary" :href="RESUME_URL" target="_blank" rel="noopener">
              <Icon name="download" /> Download Résumé
            </a>
            <a class="btn" :href="profile.linkedin" target="_blank" rel="noopener">
              <Icon name="linkedin" /> LinkedIn
            </a>
            <a class="btn" :href="profile.github" target="_blank" rel="noopener">
              <Icon name="github" /> GitHub
            </a>
            <a class="btn" :href="`mailto:${profile.email}`">
              <Icon name="mail" /> Email Me
            </a>
          </div>
        </div>

        <div class="hero__code reveal" style="animation-delay: 0.12s">
          <CodeBlock caption="// profile.ts">
            <span class="cl"><span class="tok-key">export const</span> <span class="tok-prop">profile</span> <span class="tok-punct">= {</span></span>
            <span class="cl"><span class="indent" />name<span class="tok-punct">:</span> <span class="tok-str">"{{ profile.name }}"</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="indent" />role<span class="tok-punct">:</span> <span class="tok-str">"Senior Full Stack Engineer"</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="indent" />location<span class="tok-punct">:</span> <span class="tok-str">"{{ profile.location }}"</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="indent" />experience<span class="tok-punct">:</span> <span class="tok-str">"{{ profile.experience }}"</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="indent" />email<span class="tok-punct">:</span> <span class="tok-str">"{{ profile.email }}"</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="indent" />linkedin<span class="tok-punct">:</span> <span class="tok-str">"/in/sandycr11"</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="indent" />github<span class="tok-punct">:</span> <span class="tok-str">"/sandycr11"</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="indent" /><span class="tok-prop">available</span><span class="tok-punct">:</span> <span class="tok-key">true</span><span class="tok-punct">,</span></span>
            <span class="cl"><span class="tok-punct">}</span></span>
          </CodeBlock>
        </div>
      </div>
    </section>

    <!-- ══════════════════ 2 · TECH STACK ══════════════════ -->
    <section id="s-stack" data-id="stack" class="section">
      <div class="section__label"><span class="dot" /> 02 — Tech Stack</div>
      <SectionCard file="stack.ts" title="Technical Stack" hint="// tools I reach for">
        <p class="lead">
          A full-stack toolkit spanning backend services, modern frontends, data,
          cloud, and AI tooling — chosen for reliability in production.
        </p>
        <div class="stack-grid" data-reveal>
          <div v-for="cat in stackCats" :key="cat.key" class="stack-cat">
            <div class="stack-cat__head">
              <Icon :name="cat.icon" class="stack-cat__icon" />
              <span class="stack-cat__name mono">{{ cat.label }}</span>
              <span class="stack-cat__count mono">[{{ cat.items.length }}]</span>
            </div>
            <div class="stack-cat__badges">
              <SkillBadge
                v-for="item in cat.items"
                :key="item"
                :label="item"
                :tone="cat.key === 'ai' ? 'accent' : 'default'"
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </section>

    <!-- ══════════════════ 3 · EXPERIENCE ══════════════════ -->
    <section id="s-experience" data-id="experience" class="section">
      <div class="section__label"><span class="dot" /> 03 — Experience</div>
      <SectionCard file="experience.ts" title="Work Experience" hint="// experience[]">
        <div class="timeline">
          <div
            v-for="(job, i) in experience"
            :key="job.company"
            class="tl-item"
            data-reveal
          >
            <div class="tl-marker">
              <span class="tl-dot" />
              <span v-if="i < experience.length - 1" class="tl-line" />
            </div>
            <div class="tl-body">
              <div class="tl-head">
                <div>
                  <h3 class="tl-company">{{ job.company }}</h3>
                  <p class="tl-role mono">{{ job.role }}</p>
                </div>
                <span class="tl-period mono">{{ job.period }}</span>
              </div>
              <div class="tl-stack">
                <SkillBadge v-for="s in job.stack" :key="s" :label="s" />
              </div>
              <ul class="tl-highlights">
                <li v-for="(h, hi) in job.highlights" :key="hi">
                  <Icon name="arrow" class="tl-arrow" /><span>{{ h }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionCard>
    </section>

    <!-- ══════════════════ 4 · AI LEVERAGE ══════════════════ -->
    <section id="s-ai" data-id="ai" class="section">
      <div class="section__label"><span class="dot" /> 04 — AI Leverage</div>
      <SectionCard file="ai-leverage.ts" title="AI Leverage" hint="// engineering multiplier">
        <div class="ai">
          <div class="ai__hero" data-reveal>
            <Icon name="sparkles" class="ai__spark" />
            <h3 class="ai__headline">{{ aiLeverage.headline }}</h3>
            <p class="ai__philosophy mono">
              <span class="tok-com">/* {{ aiLeverage.philosophy }} */</span>
            </p>
          </div>

          <!-- Metrics -->
          <div class="ai__metrics" data-reveal>
            <div class="ai__metrics-head">
              <span class="mono ai__sub">measuredImpact()</span>
              <span class="ai__sub-note">relative to my prior baseline</span>
            </div>
            <div class="ai__metrics-list">
              <MetricCard
                v-for="(m, i) in aiMetrics"
                :key="m.label"
                :label="m.label"
                :value="m.value"
                :delay="i * 120"
              />
            </div>
          </div>

          <!-- Tools + use cases + impact -->
          <div class="ai__cols">
            <div class="ai__col" data-reveal>
              <h4 class="ai__col-title mono"># tools</h4>
              <div class="ai__chips">
                <SkillBadge v-for="t in aiLeverage.tools" :key="t" :label="t" tone="accent" />
              </div>
            </div>
            <div class="ai__col" data-reveal>
              <h4 class="ai__col-title mono"># useCases</h4>
              <ul class="ai__list">
                <li v-for="u in aiLeverage.useCases" :key="u">
                  <Icon name="play" class="ai__bullet" />{{ u }}
                </li>
              </ul>
            </div>
            <div class="ai__col" data-reveal>
              <h4 class="ai__col-title mono"># impact</h4>
              <ul class="ai__list">
                <li v-for="im in aiLeverage.impact" :key="im">
                  <Icon name="bolt" class="ai__bullet ai__bullet--amber" />{{ im }}
                </li>
              </ul>
            </div>
          </div>

          <div class="ai__note" data-reveal>
            <Icon name="check" class="ai__note-icon" />
            <p>{{ aiLeverage.note }}</p>
          </div>
        </div>
      </SectionCard>
    </section>

    <!-- ══════════════════ 5 · PROJECTS ══════════════════ -->
    <section id="s-projects" data-id="projects" class="section">
      <div class="section__label"><span class="dot" /> 05 — Projects</div>
      <SectionCard file="projects.ts" title="Selected Projects" hint="// projects.map()">
        <div class="proj-grid">
          <div
            v-for="(p, i) in projects"
            :key="p.name"
            data-reveal
            :style="{ transitionDelay: i * 60 + 'ms' }"
          >
            <ProjectCard :project="p" :index="i" />
          </div>
        </div>
      </SectionCard>
    </section>

    <!-- ══════════════════ 6 · CONTACT ══════════════════ -->
    <section id="s-contact" data-id="contact" class="section section--last">
      <div class="section__label"><span class="dot" /> 06 — Contact</div>
      <SectionCard file="contact.ts" title="Get In Touch" hint="// let's talk">
        <div class="contact" data-reveal>
          <CodeBlock caption="// contact.ts">
            <span class="cl"><span class="tok-key">function</span> <span class="tok-fn">hire</span><span class="tok-punct">(</span><span class="tok-prop">engineer</span><span class="tok-punct">) {</span></span>
            <span class="cl"><span class="indent" /><span class="tok-key">return</span> <span class="tok-prop">engineer</span><span class="tok-punct">.</span><span class="tok-fn">ships</span><span class="tok-punct">(</span><span class="tok-str">"reliable software"</span><span class="tok-punct">)</span></span>
            <span class="cl"><span class="tok-punct">}</span></span>
          </CodeBlock>

          <p class="contact__msg">
            Open to senior full stack and backend-focused roles. The fastest way to
            reach me is email — or grab the résumé below.
          </p>

          <div class="contact__cta">
            <a class="btn btn--primary" :href="RESUME_URL" target="_blank" rel="noopener">
              <Icon name="download" /> Download Résumé
            </a>
            <a class="btn" :href="`mailto:${profile.email}`">
              <Icon name="mail" /> {{ profile.email }}
            </a>
            <a class="btn" :href="profile.linkedin" target="_blank" rel="noopener">
              <Icon name="linkedin" /> LinkedIn
            </a>
            <a class="btn" :href="profile.github" target="_blank" rel="noopener">
              <Icon name="github" /> GitHub
            </a>
          </div>
        </div>
      </SectionCard>

      <footer class="footer mono">
        <span class="tok-com">// Built with Vue 3 + Vite · {{ new Date().getFullYear() }} {{ profile.name }}</span>
      </footer>
    </section>
  </AppShell>
</template>

<style scoped>
.lead {
  font-size: 1rem;
  color: var(--fg-muted);
  max-width: 70ch;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

/* ── HERO ──────────────────────────────────────────────────────────────── */
.hero { margin-bottom: 3.75rem; }
.hero__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2.5rem;
  align-items: center;
}
.hero__name {
  font-family: var(--font-ui);
  font-size: clamp(2.4rem, 5.5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: var(--fg-bright);
  margin: 0.5rem 0 0.85rem;
}
.hero__caret {
  color: var(--accent);
  font-weight: 400;
  animation: caret 1.1s steps(1) infinite;
}
.hero__role { font-size: 1rem; margin-bottom: 1.25rem; }
.hero__summary {
  font-size: 1.05rem;
  color: var(--fg-muted);
  line-height: 1.75;
  max-width: 60ch;
  margin-bottom: 1.75rem;
}

.hero__stats {
  display: flex;
  gap: 1.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.stat { display: flex; flex-direction: column; gap: 0.25rem; }
.stat__num {
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--accent-teal);
  line-height: 1;
}
.stat__lbl { font-size: 0.78rem; color: var(--fg-dim); line-height: 1.35; }

.hero__cta { display: flex; flex-wrap: wrap; gap: 0.7rem; }

/* ── STACK ─────────────────────────────────────────────────────────────── */
.stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.1rem;
}
.stack-cat {
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 1.1rem;
}
.stack-cat__head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}
.stack-cat__icon { width: 18px; height: 18px; color: var(--accent); flex: none; }
.stack-cat__name { font-size: 0.92rem; font-weight: 600; color: var(--fg-bright); }
.stack-cat__count { font-size: 0.78rem; color: var(--syn-number); margin-left: auto; }
.stack-cat__badges { display: flex; flex-wrap: wrap; gap: 0.4rem; }

/* ── TIMELINE ──────────────────────────────────────────────────────────── */
.timeline { display: flex; flex-direction: column; }
.tl-item { display: flex; gap: 1.1rem; }
.tl-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  padding-top: 6px;
}
.tl-dot {
  width: 13px; height: 13px; border-radius: 50%;
  background: var(--bg-app);
  border: 3px solid var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
  flex: none;
}
.tl-line { flex: 1; width: 2px; background: var(--border); margin: 6px 0; }
.tl-body { padding-bottom: 2rem; flex: 1; min-width: 0; }
.tl-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;
}
.tl-company {
  font-family: var(--font-ui);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--fg-bright);
}
.tl-role { font-size: 0.85rem; color: var(--syn-property); margin-top: 2px; }
.tl-period {
  font-size: 0.78rem;
  color: var(--syn-comment);
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  white-space: nowrap;
}
.tl-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.85rem; }
.tl-highlights { display: flex; flex-direction: column; gap: 0.5rem; }
.tl-highlights li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.92rem;
  color: var(--fg);
  line-height: 1.6;
}
.tl-arrow { width: 15px; height: 15px; color: var(--accent); flex: none; margin-top: 4px; }

/* ── AI LEVERAGE ───────────────────────────────────────────────────────── */
.ai { display: flex; flex-direction: column; gap: 1.75rem; }
.ai__hero {
  text-align: center;
  padding: 1.5rem;
  border-radius: var(--radius);
  background:
    radial-gradient(120% 120% at 50% 0%, rgba(0, 122, 204, 0.12), transparent 70%),
    var(--bg-inset);
  border: 1px solid var(--border-soft);
}
.ai__spark { width: 30px; height: 30px; color: var(--accent-teal); margin-bottom: 0.5rem; }
.ai__headline {
  font-family: var(--font-ui);
  font-size: clamp(1.25rem, 2.6vw, 1.7rem);
  font-weight: 700;
  color: var(--fg-bright);
  line-height: 1.3;
  max-width: 28ch;
  margin: 0 auto 0.6rem;
}
.ai__philosophy { font-size: 0.92rem; }

.ai__metrics {
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 1.4rem;
}
.ai__metrics-head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.1rem;
  flex-wrap: wrap;
}
.ai__sub { color: var(--syn-function); font-size: 0.95rem; font-weight: 600; }
.ai__sub-note { font-size: 0.8rem; color: var(--fg-dim); }
.ai__metrics-list { display: flex; flex-direction: column; gap: 1rem; }

.ai__cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.1rem;
}
.ai__col {
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 1.1rem;
}
.ai__col-title {
  font-size: 0.85rem;
  color: var(--syn-comment);
  margin-bottom: 0.85rem;
  font-weight: 600;
}
.ai__chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.ai__list { display: flex; flex-direction: column; gap: 0.55rem; }
.ai__list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--fg);
}
.ai__bullet { width: 12px; height: 12px; color: var(--accent); flex: none; }
.ai__bullet--amber { color: var(--accent-amber); }

.ai__note {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 1.1rem 1.25rem;
  border-radius: var(--radius);
  border: 1px solid rgba(78, 201, 176, 0.3);
  background: rgba(78, 201, 176, 0.07);
}
.ai__note-icon { width: 18px; height: 18px; color: var(--accent-teal); flex: none; margin-top: 3px; }
.ai__note p { font-size: 0.95rem; color: var(--fg); line-height: 1.7; }

/* ── PROJECTS ──────────────────────────────────────────────────────────── */
.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 1.2rem;
}

/* ── CONTACT ───────────────────────────────────────────────────────────── */
.contact { display: flex; flex-direction: column; gap: 1.4rem; }
.contact__msg {
  font-size: 1.05rem;
  color: var(--fg-muted);
  line-height: 1.75;
  max-width: 62ch;
}
.contact__cta { display: flex; flex-wrap: wrap; gap: 0.7rem; }

.section--last { margin-bottom: 1rem; }
.footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-soft);
  font-size: 0.82rem;
}

/* ── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .hero__grid { grid-template-columns: 1fr; gap: 1.75rem; }
}
@media (max-width: 560px) {
  .hero__stats { gap: 1.25rem; }
  .stat__num { font-size: 1.55rem; }
  .tl-head { gap: 0.4rem; }
}
</style>
