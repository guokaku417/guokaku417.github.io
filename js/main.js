/* ============================================
   CodeLog - 交互脚本
   ============================================ */

'use strict';

// ============================================
// 1. 博客数据
// ============================================
const blogPosts = [
    {
        tag: '算法',
        title: '动态规划入门：从斐波那契到背包问题',
        excerpt: '动态规划是算法面试中的重中之重。本文从最基础的斐波那契数列开始，带你逐步理解 DP 的核心思想——状态定义与状态转移。',
        date: '2026-05-01',
        readTime: '8 分钟',
        link: 'blog/dp-intro.html'
    },
    {
        tag: '前端',
        title: 'React Hooks 原理浅析：useState 与 useEffect',
        excerpt: 'Hooks 是 React 16.8 引入的革命性特性。本文从源码层面解析 useState 和 useEffect 的实现机制，帮你真正理解 Hooks 的工作原理。',
        date: '2026-04-20',
        readTime: '12 分钟',
        link: 'blog/react-hooks.html'
    },
    {
        tag: '系统',
        title: 'CSAPP 读书笔记：深入了解计算机系统',
        excerpt: 'CSAPP 是计算机系统方向的经典教材。本文分享我在阅读过程中的核心收获，包括信息的表示、程序的机器级表示等关键概念。',
        date: '2026-04-10',
        readTime: '15 分钟',
        link: 'blog/csapp-notes.html'
    },
    {
        tag: '数据结构',
        title: '从红黑树到 B+ 树：索引的数据结构进化史',
        excerpt: '数据库索引为什么要用 B+ 树而不是红黑树？本文从二叉搜索树出发，一步步推导出 B+ 树的设计思路，并分析每种数据结构的适用场景。',
        date: '2026-03-28',
        readTime: '10 分钟',
        link: 'blog/index-data-structures.html'
    },
    {
        tag: '工具',
        title: 'Git 工作流最佳实践：让协作更高效',
        excerpt: '团队协作中 Git 的用法至关重要。本文介绍几种主流的 Git 工作流（Git Flow、GitHub Flow），并分享日常开发中的实用技巧。',
        date: '2026-03-15',
        readTime: '7 分钟',
        link: 'blog/git-workflow.html'
    },
    {
        tag: 'Python',
        title: 'Python 装饰器：从入门到进阶',
        excerpt: '装饰器是 Python 中非常强大的特性。本文从闭包概念讲起，逐步深入到带参数的装饰器、类装饰器，以及 functools.wraps 的作用。',
        date: '2026-03-01',
        readTime: '10 分钟',
        link: 'blog/python-decorators.html'
    }
];

// ============================================
// 2. 项目数据
// ============================================
const projects = [
    {
        title: 'Tic-Tac-Toe',
        description: '本项目基于 C 语言实现经典的三子棋游戏，核心逻辑包含棋盘初始化、落子判定、胜负判断、棋盘打印等功能，代码结构清晰，适合 C 语言入门学习。',
        tech: ['C'],
        link: 'projects/tic-tac-toe.html',
        github: 'https://github.com/guokaku417/Tic-Tac-Toe'
    },
    {
        title: 'Minesweeper',
        description: '本项目基于 C 语言实现经典的扫雷游戏，核心逻辑包含雷区初始化、布雷与排雷判定、周围地雷数统计、递归展开空白格子、游戏胜负判断等功能，代码结构清晰，适合 C 语言入门学习。',
        tech: ['C'],
        link: 'https://github.com/guokaku417/Minesweeper',
        github: 'https://github.com/guokaku417/Minesweeper'
    },
    {
        title: 'LeetCode Journal',
        description: 'LeetCode 刷题记录与题解汇总，按照数据结构分类整理，包含详细思路分析和代码实现。',
        tech: ['Python', 'Markdown'],
        link: 'projects/leetcode-journal.html',
        github: 'https://github.com/guokaku417'
    },
    {
        title: 'MiniOS',
        description: '课程设计项目：在 x86 架构上实现的微型操作系统内核，支持基本进程调度、内存管理和文件系统。',
        tech: ['C', 'Assembly'],
        link: 'projects/minios.html',
        github: 'https://github.com/guokaku417'
    }
];

// ============================================
// 3. Typewriter 打字机效果
// ============================================
class Typewriter {
    constructor(element, words, speed = 100, deleteSpeed = 60, pause = 2000) {
        this.element = element;
        this.words = words;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pause = pause;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
    }

    start() {
        this.tick();
    }

    tick() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.element.textContent = currentWord.substring(0, this.charIndex);

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            this.isDeleting = true;
            setTimeout(() => this.tick(), this.pause);
            return;
        }

        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            setTimeout(() => this.tick(), 500);
            return;
        }

        const delay = this.isDeleting ? this.deleteSpeed : this.speed;
        setTimeout(() => this.tick(), delay);
    }
}

// ============================================
// 4. 工具函数
// ============================================

// 数字动画
function animateCounter(element, target, duration = 2000) {
    const start = performance.now();
    const initial = 0;

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(eased * target);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// 节流
function throttle(fn, delay) {
    let last = 0;
    return function (...args) {
        const now = Date.now();
        if (now - last >= delay) {
            last = now;
            fn.apply(this, args);
        }
    };
}

// ============================================
// 5. DOM 渲染
// ============================================

function renderBlogPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    grid.innerHTML = blogPosts.map((post, index) => `
        <article class="blog-card" data-index="${index}" style="cursor: pointer;">
            <span class="blog-card-tag">${post.tag}</span>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <div class="blog-card-meta">
                <span>${post.date} · ${post.readTime}</span>
                <span class="blog-card-link">阅读 →</span>
            </div>
        </article>
    `).join('');

    grid.querySelectorAll('.blog-card').forEach(card => {
        const index = parseInt(card.dataset.index);
        card.addEventListener('click', () => {
            window.location.href = blogPosts[index].link;
        });
    });
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projects.map(project => `
        <a href="${project.github}" class="project-card" target="_blank" rel="noopener noreferrer">
            <div class="project-card-header">
                <svg class="project-folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                <svg class="github-link" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
            </div>
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-description">${project.description}</p>
            <div class="project-card-tech">
                ${project.tech.map(t => `<span>${t}</span>`).join('')}
            </div>
        </a>
    `).join('');
}

// ============================================
// 6. 主题切换
// ============================================
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('blog-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('blog-theme', next);
    });
}

// ============================================
// 7. 移动端菜单
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ============================================
// 8. 滚动相关
// ============================================
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // 回到顶部按钮
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;

        // 回到顶部
        backToTop.classList.toggle('visible', scrollY > 400);

        // 导航栏阴影
        navbar.style.boxShadow = scrollY > 50
            ? '0 2px 20px rgba(0, 0, 0, 0.08)'
            : 'none';

        // 活跃导航高亮
        let currentSection = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (scrollY >= top) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }, 100));

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// 9. 滚动进入动画 (Intersection Observer)
// ============================================
function initScrollAnimation() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// ============================================
// 10. 统计数字动画
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// 11. 技能条动画
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// 12. 占位链接提示
// ============================================
function initPlaceholderLinks() {
    // 为所有指向 # 的链接添加提示
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('内容准备中，敬请期待 🚧');
        });
    });
}

// Toast 提示
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ============================================
// 13. 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 打字机效果
    const typingEl = document.getElementById('typingText');
    if (typingEl) {
        const typewriter = new Typewriter(
            typingEl,
            ['一个 Bug 制造者', '一名 CS 学生', '一位开源爱好者'],
            100, 60, 2000
        );
        typewriter.start();
    }

    // 渲染动态内容
    renderBlogPosts();
    renderProjects();

    // 初始化功能
    initTheme();
    initMobileMenu();
    initScrollEffects();
    initScrollAnimation();
    initCounterAnimation();
    initSkillBars();
    initPlaceholderLinks();
});
