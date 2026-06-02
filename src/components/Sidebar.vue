<script setup>
import Icon from './Icon.vue'
import { profile } from '../data/profile.js'

defineProps({
  tabs: { type: Array, required: true },
  active: { type: String, default: '' },
})
defineEmits(['navigate'])

const quickStack = ['.NET', 'ASP.NET Core', 'Vue.js', 'Nuxt 3', 'Node.js', 'TypeScript', 'SQL Server', 'Azure', 'OpenAI API']
const monogram = profile.name.split(' ').map((w) => w[0]).join('')
</script>

<template>
  <aside class="sb">
    <!-- Profile -->
    <div class="sb__profile">
      <div class="sb__avatar mono">{{ monogram }}</div>
      <div class="sb__id">
        <div class="sb__name">{{ profile.name }}</div>
        <div class="sb__role mono">{{ profile.role }}</div>
      </div>
    </div>

    <div class="sb__meta">
      <div class="sb__meta-row">
        <Icon name="pin" /><span>{{ profile.location }}</span>
      </div>
      <div class="sb__meta-row">
        <Icon name="bolt" /><span>{{ profile.experience }} experience</span>
      </div>
      <a class="sb__meta-row sb__meta-row--link" :href="`mailto:${profile.email}`">
        <Icon name="mail" /><span>{{ profile.email }}</span>
      </a>
    </div>

    <!-- Explorer / nav -->
    <nav class="sb__section">
      <div class="sb__heading mono"><Icon name="explorer" /> EXPLORER</div>
      <div class="sb__tree mono">
        <div class="sb__folder"><Icon name="folder" /> sandy-campos</div>
        <button
          v-for="t in tabs"
          :key="t.id"
          class="sb__file"
          :class="{ 'sb__file--active': active === t.id }"
          @click="$emit('navigate', t.id)"
        >
          <Icon name="file" /> {{ t.file }}
        </button>
      </div>
    </nav>

    <!-- Quick stack -->
    <div class="sb__section">
      <div class="sb__heading mono"><Icon name="sparkles" /> QUICK STACK</div>
      <div class="sb__chips">
        <span v-for="s in quickStack" :key="s" class="sb__chip mono">{{ s }}</span>
      </div>
    </div>

    <!-- Links -->
    <div class="sb__section">
      <div class="sb__heading mono"><Icon name="git" /> LINKS</div>
      <div class="sb__links">
        <a class="sb__link" :href="profile.linkedin" target="_blank" rel="noopener">
          <Icon name="linkedin" /><span>LinkedIn</span><Icon name="external" class="sb__ext" />
        </a>
        <a class="sb__link" :href="profile.github" target="_blank" rel="noopener">
          <Icon name="github" /><span>GitHub</span><Icon name="external" class="sb__ext" />
        </a>
        <a class="sb__link" :href="`mailto:${profile.email}`">
          <Icon name="mail" /><span>Email</span><Icon name="external" class="sb__ext" />
        </a>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sb {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.4rem 1.15rem;
}

/* Profile */
.sb__profile { display: flex; align-items: center; gap: 0.85rem; }
.sb__avatar {
  width: 52px; height: 52px;
  flex: none;
  border-radius: var(--radius);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.15rem;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--accent-teal));
  box-shadow: 0 6px 18px var(--accent-glow);
  letter-spacing: 0.02em;
}
.sb__name { font-weight: 700; font-size: 1.05rem; color: var(--fg-bright); line-height: 1.25; }
.sb__role { font-size: 0.72rem; color: var(--syn-property); margin-top: 2px; }

/* Meta */
.sb__meta { display: flex; flex-direction: column; gap: 0.55rem; }
.sb__meta-row {
  display: flex; align-items: center; gap: 0.55rem;
  font-size: 0.83rem; color: var(--fg-muted);
}
.sb__meta-row svg { width: 15px; height: 15px; color: var(--fg-dim); flex: none; }
.sb__meta-row--link { transition: color 0.15s var(--ease); word-break: break-all; }
.sb__meta-row--link:hover { color: var(--accent-teal); }

/* Sections */
.sb__section { display: flex; flex-direction: column; gap: 0.6rem; }
.sb__heading {
  display: flex; align-items: center; gap: 0.45rem;
  font-size: 0.68rem; letter-spacing: 0.12em;
  color: var(--fg-dim);
  text-transform: uppercase;
}
.sb__heading svg { width: 13px; height: 13px; }

/* Tree */
.sb__tree { display: flex; flex-direction: column; gap: 0.1rem; }
.sb__folder {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.82rem; color: var(--syn-property);
  padding: 0.25rem 0.3rem;
}
.sb__folder svg { width: 14px; height: 14px; color: var(--accent-amber); }
.sb__file {
  display: flex; align-items: center; gap: 0.45rem;
  font-size: 0.82rem; color: var(--fg-muted);
  padding: 0.32rem 0.3rem 0.32rem 1.4rem;
  border-radius: var(--radius-sm);
  text-align: left;
  transition: background 0.15s var(--ease), color 0.15s var(--ease);
}
.sb__file svg { width: 13px; height: 13px; color: var(--accent-teal); flex: none; }
.sb__file:hover { background: var(--bg-hover); color: var(--fg); }
.sb__file--active { background: var(--accent-soft); color: var(--fg-bright); }

/* Chips */
.sb__chips { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.sb__chip {
  font-size: 0.73rem;
  color: var(--syn-string);
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  padding: 0.2rem 0.45rem;
}

/* Links */
.sb__links { display: flex; flex-direction: column; gap: 0.35rem; }
.sb__link {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.86rem; color: var(--fg);
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-soft);
  background: var(--bg-inset);
  transition: border-color 0.15s var(--ease), transform 0.15s var(--ease), color 0.15s var(--ease);
}
.sb__link svg { width: 16px; height: 16px; flex: none; }
.sb__link .sb__ext { width: 13px; height: 13px; margin-left: auto; color: var(--fg-dim); }
.sb__link:hover {
  border-color: var(--accent);
  transform: translateX(2px);
  color: var(--accent-teal);
}
</style>
