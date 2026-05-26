# Implementation Plan: freelancer-automation.com

## Overview

This implementation plan converts the freelancer-automation.com Hugo site design into actionable coding tasks. The site is a content-driven resource hub for freelancers seeking automation solutions, featuring SEO-optimized content pillars, lead magnet systems, and strategic conversion funnels to ai-workshops.online.

**Technology Stack:**
- Hugo (Static Site Generator) - already configured
- GitHub Pages (Hosting) - already configured with custom domain
- Existing styling and theme - no changes needed
- Focus: **Content creation for SEO and monetization**

## Tasks

- [x] 1. Initialize Hugo project structure and configuration
  - [x] 1.1 Create Hugo site with base configuration
    - Initialize Hugo site in `freelancer-automation.com/` directory
    - Create `hugo.toml` with site metadata, baseURL, language settings
    - Configure Hugo Pipes for SCSS and JS processing
    - Set up build settings for minification and fingerprinting
    - _Requirements: 12.1, 12.2, 12.3_

  - [x] 1.2 Set up directory structure per design specification
    - Create `content/` directory with subdirectories: pillars/, tools/, scripts/, resources/, blog/, legal/, search/
    - Create `layouts/` directory with: _default/, pillars/, tools/, scripts/, partials/, shortcodes/
    - Create `data/` directory for YAML data files
    - Create `assets/css/` and `assets/js/` directories
    - Create `static/images/`, `static/downloads/`, `static/fonts/` directories
    - Create `archetypes/` directory for content templates
    - Create `i18n/` directory with `en.yaml` for internationalization
    - _Requirements: 12.4, 12.7, 12.8, 25.1, 25.2_

  - [x] 1.3 Configure SEO and URL structure
    - Set up permalink configuration for hierarchical URLs: `/{category}/{subcategory}/{slug}/`
    - Configure sitemap generation in hugo.toml
    - Create `static/robots.txt` with appropriate crawl rules
    - Configure canonical URL generation
    - Set up hreflang tag support structure
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.7_

- [x] 2. Implement base layout templates
  - [x] 2.1 Create baseof.html with document structure
    - Implement HTML5 document structure with proper lang attribute
    - Add head partial inclusion with meta tags, CSS, and preconnect hints
    - Add body structure with skip navigation link
    - Include nav, main content block, and footer partials
    - Add JavaScript includes at end of body
    - _Requirements: 2.8, 17.1, 17.4_

  - [x] 2.2 Create head.html partial with SEO meta tags
    - Implement title tag with site name suffix
    - Add meta description from frontmatter
    - Add canonical URL meta tag
    - Implement Open Graph tags (og:title, og:description, og:image, og:url, og:type)
    - Implement Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
    - Add resource hints (preconnect for fonts, analytics)
    - Include critical CSS inline
    - _Requirements: 2.5, 2.6, 2.9, 4.4_

  - [x] 2.3 Write property test for meta tag generation
    - **Property 3: Meta Tags Are Generated Within Length Constraints**
    - Test that meta title is under 60 characters
    - Test that meta description is under 155 characters
    - Test that OG/Twitter tags contain correct values from frontmatter
    - **Validates: Requirements 2.9, 4.4**

  - [x] 2.4 Create nav.html partial with responsive navigation
    - Implement primary navigation from data/navigation.yaml
    - Create dropdown menus for Guides, Tools, Scripts, Resources
    - Add secondary navigation bar with Search, Newsletter, Workshop CTA
    - Implement hamburger menu for mobile (under 768px)
    - Add ARIA labels and keyboard navigation support
    - _Requirements: 9.1, 9.2, 16.2, 17.7, 17.8_

  - [x] 2.5 Create footer.html partial
    - Add ecosystem links section to all Ecosystem_Sites
    - Include legal page links (Privacy, Terms, Imprint, Cookies, Affiliate Disclosure)
    - Add newsletter signup form
    - Include "By Linda Mohamed" attribution
    - Add social media links
    - _Requirements: 8.3, 8.7, 21.6_

  - [x] 2.6 Create breadcrumbs.html partial with Schema markup
    - Generate breadcrumb trail from URL path segments
    - Implement Schema.org BreadcrumbList JSON-LD markup
    - Style breadcrumbs with proper separators
    - Ensure each segment links to correct parent page
    - _Requirements: 1.5_

  - [x] 2.7 Write property test for breadcrumb navigation
    - **Property 2: Breadcrumb Navigation Reflects URL Hierarchy**
    - Test that breadcrumbs contain one entry per path segment
    - Test that entries are in order from root to current page
    - Test that BreadcrumbList schema accurately represents hierarchy
    - **Validates: Requirements 1.5**

- [x] 3. Checkpoint - Verify base layout structure
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement SCSS styling system
  - [x] 4.1 Create SCSS architecture with variables and utilities
    - Create `_variables.scss` with color palette, typography, spacing, breakpoints
    - Create `_typography.scss` with font-face declarations and text styles
    - Create `_utilities.scss` with helper classes
    - Create `_components.scss` with reusable component styles
    - Create `main.scss` importing all partials
    - _Requirements: 16.1, 17.5_

  - [x] 4.2 Implement responsive grid and layout system
    - Create mobile-first CSS with breakpoints at 480px, 768px, 1024px, 1280px
    - Implement flexible grid system for content layouts
    - Create sidebar layout for archive pages
    - Implement full-width and contained layout options
    - _Requirements: 16.1, 16.8_

  - [x] 4.3 Implement accessibility-compliant styling
    - Ensure color contrast ratios of 4.5:1 for normal text, 3:1 for large text
    - Create visible focus indicators for all interactive elements
    - Implement reduced motion media query support
    - Style skip navigation link
    - _Requirements: 17.5, 17.6, 17.10_

- [ ] 5. Implement content type templates
  - [x] 5.1 Create Tutorial template (layouts/pillars/single.html)
    - Display reading time badge (calculated at 200 words per minute)
    - Display difficulty level indicator (Beginner/Intermediate/Advanced)
    - Display required tools list with links to tool database
    - Implement numbered step sections
    - Add progress indicator for scroll position
    - Include table of contents (auto-generated from H2/H3)
    - Add related cluster articles section
    - _Requirements: 5.1, 5.2, 11.1, 11.4, 11.5_

  - [x] 5.2 Write property test for content type rendering
    - **Property 6: Content Type Templates Render Required Fields**
    - Test Tutorial displays reading time, difficulty, required tools
    - Test Tool Review displays star ratings (1-5 scale)
    - Test code blocks with supported languages have syntax highlighting
    - **Validates: Requirements 5.2, 5.3, 5.5, 11.4**

  - [x] 5.3 Create Tool Review template (layouts/tools/review.html)
    - Display structured rating system (1-5 stars) for: Ease of Use, Features, Pricing, Support, Overall
    - Create pricing comparison table from frontmatter
    - Display pros/cons lists with icons
    - Add verdict summary box with highlight styling
    - Include alternative tools section
    - Add CTA to related tutorials
    - _Requirements: 5.1, 5.3_

  - [x] 5.4 Create Tool Comparison template (layouts/tools/comparison.html)
    - Implement interactive comparison table
    - Create feature matrix with filtering capability
    - Display winner badges per category
    - Add overall recommendation section
    - Include use case scenarios
    - _Requirements: 5.1, 5.4_

  - [x] 5.5 Create Script/Code Snippet template (layouts/scripts/single.html)
    - Implement syntax-highlighted code block with language label
    - Add one-click copy button functionality
    - Add download button for file
    - Display platform compatibility badges
    - Include step-by-step implementation guide
    - _Requirements: 5.1, 5.5, 5.6, 11.2_

  - [x] 5.6 Create default single.html and list.html templates
    - Implement article page structure per Requirement 11.1
    - Add author bio box with photo and links
    - Include social sharing buttons
    - Add "What to Read Next" recommendation at article end
    - Implement pagination with 12 articles per page on list views
    - _Requirements: 11.1, 11.6, 9.8_

- [ ] 6. Implement Schema.org structured data
  - [x] 6.1 Create schema partials for each content type
    - Create `partials/schema/article.html` for Article schema
    - Create `partials/schema/howto.html` for HowTo schema (tutorials)
    - Create `partials/schema/faq.html` for FAQPage schema
    - Create `partials/schema/breadcrumb.html` for BreadcrumbList schema
    - Create Review schema for tool reviews
    - Create SoftwareSourceCode schema for scripts
    - _Requirements: 2.10, 4.5_

  - [x] 6.2 Write property test for schema markup
    - **Property 4: Schema Markup Matches Content Type**
    - Test that JSON-LD is valid according to Schema.org specifications
    - Test that required fields are populated from frontmatter
    - Test each schema type (Article, HowTo, FAQPage, Review, SoftwareSourceCode)
    - **Validates: Requirements 2.10, 4.5**

- [ ] 7. Checkpoint - Verify content templates
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement shortcode library
  - [~] 8.1 Create CTA shortcode with UTM tracking
    - Accept parameters: type, headline, description, button_text, button_url, utm_campaign
    - Generate UTM parameters: utm_source=freelancer-automation&utm_medium=content&utm_campaign={article-slug}
    - Support types: workshop, lead-magnet, newsletter
    - Include trust signal display option
    - _Requirements: 7.2, 7.6, 12.6_

  - [~] 8.2 Write property test for UTM parameters
    - **Property 8: CTA Links Include Correct UTM Parameters**
    - Test all CTA links to ai-workshops.online include correct UTM format
    - Test utm_campaign matches current page slug
    - **Validates: Requirements 7.6**

  - [~] 8.3 Create lead-magnet shortcode
    - Accept parameters: id, title, description, image
    - Load lead magnet data from data/lead-magnets.yaml
    - Display email capture form with ConvertKit integration
    - Include cover image and description
    - _Requirements: 6.1, 6.2, 12.6_

  - [~] 8.4 Create code-block shortcode with copy functionality
    - Accept parameters: language, title, copy, download
    - Implement syntax highlighting for: JavaScript, Python, JSON, YAML, Bash
    - Add copy button with clipboard API
    - Add download button linking to file
    - Style with horizontal scroll on mobile
    - _Requirements: 5.5, 5.6, 12.6, 16.6_

  - [~] 8.5 Create comparison-table shortcode
    - Accept parameters: tools, criteria, filterable
    - Load tool data from data/tools.yaml
    - Generate comparison table with ratings
    - Implement filtering capability via JavaScript
    - Support swipe gestures on mobile
    - _Requirements: 5.4, 12.6, 16.7_

  - [~] 8.6 Create callout shortcode
    - Accept parameter: type (tip, warning, info, success)
    - Style each type with appropriate icon and colors
    - Ensure accessible color contrast
    - _Requirements: 12.6_

  - [~] 8.7 Create ecosystem-link shortcode
    - Accept parameters: site, path, text
    - Generate contextual links to ai-solutions.wiki, freelancer-templates.org
    - Use descriptive anchor text
    - _Requirements: 8.1, 8.2, 8.8, 12.6_

  - [~] 8.8 Create video shortcode for YouTube embeds
    - Accept parameters: id, title
    - Implement lazy loading for video embeds
    - Add accessible title attribute
    - Provide text alternative option
    - _Requirements: 12.6, 17.9_

- [ ] 9. Implement data files
  - [~] 9.1 Create tools.yaml database
    - Define schema: name, slug, logo, website, category, pricing, features, best_for, ecosystem_link
    - Add initial tool entries: Zapier, Make, n8n
    - Include pricing tiers and feature lists
    - _Requirements: 12.7_

  - [~] 9.2 Create lead-magnets.yaml
    - Define schema: id, title, description, format, file_path, cover_image, convertkit_form_id, convertkit_tag, related_pillars
    - Add 6 lead magnets per Requirement 6.1
    - _Requirements: 6.1, 12.7_

  - [~] 9.3 Create testimonials.yaml
    - Define schema: name, role, company, quote, image, workshop_attended, rating
    - Add sample testimonials
    - _Requirements: 12.7, 20.1_

  - [~] 9.4 Create navigation.yaml
    - Define main navigation structure per Requirement 9.1
    - Define secondary navigation items
    - Include dropdown children structure
    - _Requirements: 9.1, 9.2, 12.7_

  - [~] 9.5 Create faqs.yaml for FAQ schema content
    - Define schema: question, answer, category
    - Add initial FAQ entries
    - _Requirements: 4.5, 12.7_

- [ ] 10. Checkpoint - Verify shortcodes and data files
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement content archetypes
  - [~] 11.1 Create tutorial.md archetype
    - Include all required frontmatter fields per design specification
    - Add difficulty, reading_time, tools_required fields
    - Set schema_type to HowTo
    - Include placeholder content structure
    - _Requirements: 5.1, 12.4_

  - [~] 11.2 Create review.md archetype
    - Include ratings structure (ease_of_use, features, pricing, support, overall)
    - Add pricing_tiers, pros, cons, verdict fields
    - Set schema_type to Review
    - _Requirements: 5.1, 12.4_

  - [~] 11.3 Create comparison.md archetype
    - Include tools array and comparison_criteria structure
    - Add winner field
    - _Requirements: 5.1, 12.4_

  - [~] 11.4 Create remaining archetypes
    - Create case-study.md (problem/solution/results format)
    - Create resource-list.md (curated collections)
    - Create quick-tip.md (short-form advice)
    - Create script.md (code snippet with language, platform, download_file)
    - Create workflow.md (automation blueprints)
    - _Requirements: 5.1, 12.4_

- [ ] 12. Implement frontmatter validation
  - [~] 12.1 Create build-time frontmatter validation script
    - Validate required fields: title, description, date, type, primary_keyword, search_intent
    - Check field types are correct
    - Fail build with descriptive error message on validation failure
    - _Requirements: 4.3_

  - [~] 12.2 Write property test for frontmatter validation
    - **Property 7: Frontmatter Validation Enforces Required Fields**
    - Test that missing required fields fail validation
    - Test that incorrect field types fail validation
    - Test that descriptive error messages are generated
    - **Validates: Requirements 4.3**

- [ ] 13. Implement URL generation and redirects
  - [~] 13.1 Create URL generation logic
    - Implement hierarchical URL pattern: /{category}/{subcategory}/{slug}/
    - Ensure canonical URLs are generated correctly
    - _Requirements: 1.1, 1.4_

  - [~] 13.2 Write property test for URL generation
    - **Property 1: URL Generation Preserves Hierarchical Structure**
    - Test URL follows pattern /{category}/{subcategory}/{slug}/
    - Test canonical URL meta tag matches permalink
    - **Validates: Requirements 1.1, 1.4**

  - [~] 13.3 Implement redirect configuration from aliases
    - Parse aliases from frontmatter
    - Generate 301 redirect configurations
    - Output to Cloudflare Pages _redirects file
    - _Requirements: 1.8_

  - [~] 13.4 Write property test for redirect configuration
    - **Property 9: Redirect Configuration From Aliases**
    - Test that each alias generates a 301 redirect
    - Test redirects point to canonical URL
    - **Validates: Requirements 1.8**

- [ ] 14. Implement topic cluster relationships
  - [~] 14.1 Create pillar-cluster linking system
    - Display "Part of [Pillar Name] Guide" on cluster articles
    - Generate link to parent pillar page
    - Display related articles from same topic cluster
    - _Requirements: 3.2, 3.3, 3.5_

  - [~] 14.2 Write property test for topic cluster relationships
    - **Property 5: Topic Cluster Relationships Are Maintained**
    - Test "Part of [Pillar Name] Guide" displays with valid link
    - Test related articles section only contains same-cluster articles
    - **Validates: Requirements 3.2, 3.3, 3.5**

  - [~] 14.3 Create topic cluster map page
    - Generate visual representation of pillars and connected articles
    - Display article counts per pillar
    - _Requirements: 3.6_

- [ ] 15. Checkpoint - Verify content structure and validation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Implement homepage template
  - [~] 16.1 Create index.html homepage template
    - Implement hero section with headline, subheadline, CTAs, trust indicators
    - Add "Featured Guides" section with 3-4 Content_Pillars
    - Add "Popular Tools" section with logo grid
    - Add "Latest Articles" section with 6 recent posts
    - Add "Free Resources" section with Lead_Magnets
    - Add "Workshop Spotlight" section promoting ai-workshops.online
    - Add newsletter signup section
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.8_

- [ ] 17. Implement image processing
  - [~] 17.1 Configure Hugo image processing pipeline
    - Generate WebP format with JPEG/PNG fallbacks
    - Create responsive srcset values for different screen sizes
    - Implement lazy loading for below-fold images
    - Optimize images for mobile bandwidth
    - _Requirements: 2.2, 2.3, 12.5, 16.4_

  - [~] 17.2 Write property test for image processing
    - **Property 10: Image Processing Generates Responsive Formats**
    - Test output includes WebP format with fallbacks
    - Test below-fold images have loading="lazy" attribute
    - **Validates: Requirements 2.2, 2.3**

- [ ] 18. Implement client-side JavaScript functionality
  - [~] 18.1 Create main.js with core functionality
    - Implement mobile hamburger menu toggle
    - Implement dropdown menu interactions
    - Add smooth scroll for anchor links
    - Implement table of contents highlighting on scroll
    - Add progress indicator for article scroll position
    - _Requirements: 11.3, 11.5, 16.2_

  - [~] 18.2 Create search.js with Pagefind integration
    - Initialize Pagefind search index
    - Implement autocomplete suggestions after 2 characters
    - Display search results with title, excerpt, category
    - Handle zero results with suggestions
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.7_

  - [~] 18.3 Create analytics.js with event tracking
    - Implement GA4 event tracking for: page views, scroll depth, CTA clicks, lead magnet downloads
    - Implement Plausible analytics integration
    - Track search queries
    - Implement conversion funnel tracking
    - _Requirements: 13.1, 13.3, 13.4, 13.5_

  - [~] 18.4 Implement cookie consent mechanism
    - Create cookie consent banner
    - Block tracking scripts until consent given
    - Store consent preference in localStorage
    - _Requirements: 13.7, 21.8_

  - [~] 18.5 Implement lead capture popup functionality
    - Create exit-intent popup for desktop
    - Create scroll-triggered slide-in CTA (50% scroll) for mobile
    - Suppress popups for existing subscribers via localStorage
    - _Requirements: 6.5, 6.6, 6.7_

  - [~] 18.6 Implement A/B testing framework
    - Create URL parameter-based variant assignment
    - Implement JavaScript-based content swapping
    - Track variants in analytics
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 19. Checkpoint - Verify JavaScript functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Implement newsletter integration
  - [~] 20.1 Create ConvertKit form integration
    - Implement embedded form components
    - Add subscriber tagging based on lead magnet and content category
    - Implement double opt-in flow
    - _Requirements: 6.2, 6.3, 6.8, 15.1, 15.2, 15.4_

  - [~] 20.2 Create newsletter archive page template
    - Display past email content as blog posts
    - _Requirements: 15.6_

- [ ] 21. Implement legal pages
  - [~] 21.1 Create legal page templates and content
    - Create Privacy Policy page (GDPR and CCPA compliant)
    - Create Terms of Service page
    - Create Imprint/Legal Notice page
    - Create Cookie Policy page
    - Create Affiliate Disclosure page
    - Add last updated date display
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.7_

- [ ] 22. Implement error pages and monitoring
  - [~] 22.1 Create 404 error page
    - Display friendly error message
    - Include search box
    - Show popular articles section
    - Add category navigation
    - Add CTA to browse guides
    - _Requirements: 24.1_

  - [~] 22.2 Implement broken link checking in build
    - Detect broken internal links during build
    - Fail build with detailed error message
    - Log referring URL and requested path for 404s
    - _Requirements: 24.2, 24.6, 24.7_

- [ ] 23. Implement RSS feeds and social sharing
  - [~] 23.1 Create RSS feed templates
    - Generate RSS feed for all content
    - Generate RSS feeds per category and tag
    - _Requirements: 23.1_

  - [~] 23.2 Implement social sharing functionality
    - Add share buttons for Twitter/X, LinkedIn, Facebook, copy link
    - Generate pre-written social copy
    - _Requirements: 23.2, 23.7_

- [ ] 24. Create content for all 10 pillars
  - [~] 24.1 Create Email Automation pillar content
    - Write pillar page with comprehensive overview
    - Create 3-5 cluster articles (automate client responses, follow-up sequences, etc.)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.2 Create Invoice and Payment Automation pillar content
    - Write pillar page covering invoicing tools and workflows
    - Create 3-5 cluster articles (Stripe automation, recurring invoices, payment reminders)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.3 Create Client Onboarding Automation pillar content
    - Write pillar page with onboarding workflow overview
    - Create 3-5 cluster articles (welcome sequences, contract automation, intake forms)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.4 Create Social Media Automation pillar content
    - Write pillar page covering social scheduling and automation
    - Create 3-5 cluster articles (Buffer, Hootsuite, content calendars)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.5 Create Project Management Automation pillar content
    - Write pillar page with PM tool integrations
    - Create 3-5 cluster articles (Notion, Asana, Trello automations)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.6 Create Time Tracking and Reporting pillar content
    - Write pillar page covering time tracking automation
    - Create 3-5 cluster articles (Toggl, Harvest, automated reports)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.7 Create AI Tools for Freelancers pillar content
    - Write pillar page with AI tool overview
    - Create 3-5 cluster articles (ChatGPT workflows, Claude for freelancers, AI writing)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.8 Create Zapier Guides pillar content
    - Write pillar page with Zapier fundamentals
    - Create 3-5 cluster articles (best Zaps, multi-step workflows, webhooks)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.9 Create n8n Workflow Automation pillar content
    - Write pillar page with n8n overview
    - Create 3-5 cluster articles (self-hosted setup, workflow examples, integrations)
    - _Requirements: 3.1, 3.4, 4.2_

  - [~] 24.10 Create Make.com Tutorials pillar content
    - Write pillar page with Make.com fundamentals
    - Create 3-5 cluster articles (scenarios, data manipulation, API connections)
    - _Requirements: 3.1, 3.4, 4.2_

- [ ] 25. Create tool reviews and comparisons
  - [~] 25.1 Write Zapier review
    - Complete review with ratings, pricing, pros/cons, verdict
    - _Requirements: 5.1, 5.3_

  - [~] 25.2 Write Make.com review
    - Complete review with ratings, pricing, pros/cons, verdict
    - _Requirements: 5.1, 5.3_

  - [~] 25.3 Write n8n review
    - Complete review with ratings, pricing, pros/cons, verdict
    - _Requirements: 5.1, 5.3_

  - [~] 25.4 Write Zapier vs Make.com comparison
    - Side-by-side comparison with feature matrix
    - _Requirements: 5.1, 5.4_

  - [~] 25.5 Write Zapier vs n8n comparison
    - Side-by-side comparison with feature matrix
    - _Requirements: 5.1, 5.4_

- [ ] 26. Create lead magnet content
  - [~] 26.1 Create "50 Automation Scripts for Freelancers" PDF and code files
    - _Requirements: 6.1_

  - [~] 26.2 Create "Freelancer Automation Toolkit Checklist" PDF
    - _Requirements: 6.1_

  - [~] 26.3 Create "Client Onboarding Automation Template Pack"
    - _Requirements: 6.1_

  - [~] 26.4 Create "Email Template Library for Automated Responses"
    - _Requirements: 6.1_

  - [~] 26.5 Create "Zapier Workflow Blueprint Collection" JSON exports
    - _Requirements: 6.1_

  - [~] 26.6 Create "n8n Starter Workflows for Freelancers" JSON exports
    - _Requirements: 6.1_

- [ ] 27. Final review and publish
  - Review all content for SEO optimization
  - Ensure all internal links work
  - Verify lead magnet CTAs are in place
  - Test workshop upselling CTAs link correctly to ai-workshops.online

## Notes

- The site already exists with GitHub Pages hosting, custom domain, and styling in place
- Focus is on **content creation**, not infrastructure changes
- Tasks marked with `*` are optional property-based test tasks and can be skipped
- Each task references specific requirements for traceability
- The primary goal is creating the 10 content pillars with cluster articles to drive SEO traffic
- Lead magnets and workshop CTAs should be integrated into content for monetization
