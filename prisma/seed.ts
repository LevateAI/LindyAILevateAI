import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample templates
  const templates = [
    {
      title: 'Email Lead Capture & CRM Sync',
      summary: 'Automatically capture leads from forms and sync to your CRM',
      description: 'This workflow captures leads from web forms, validates the data, and automatically syncs them to your CRM system with proper tagging and lead scoring.',
      category: 'EMAIL_CRM',
      apps: ['Gmail', 'HubSpot', 'Webhooks'],
      templateConfig: {
        trigger: { type: 'webhook', path: '/lead-capture' },
        steps: [
          { type: 'validate-email', config: { required: true } },
          { type: 'enrich-data', service: 'clearbit' },
          { type: 'sync-crm', service: 'hubspot' },
          { type: 'send-welcome-email', template: 'welcome' }
        ]
      },
      estimatedSetupMins: 15,
      difficulty: 'Beginner',
      isPublic: true,
      usageCount: 247
    },
    {
      title: 'Meeting Scheduler with Calendar Sync',
      summary: 'Automate meeting scheduling with calendar integration',
      description: 'Streamline your meeting booking process with automatic calendar checking, confirmation emails, and reminder notifications.',
      category: 'CALENDAR',
      apps: ['Google Calendar', 'Calendly', 'Gmail'],
      templateConfig: {
        trigger: { type: 'webhook', path: '/schedule-meeting' },
        steps: [
          { type: 'check-availability', service: 'google-calendar' },
          { type: 'create-meeting', service: 'google-calendar' },
          { type: 'send-confirmation', template: 'meeting-confirmation' },
          { type: 'schedule-reminder', delay: '1 hour before' }
        ]
      },
      estimatedSetupMins: 20,
      difficulty: 'Intermediate',
      isPublic: true,
      usageCount: 189
    },
    {
      title: 'E-commerce Order Processing',
      summary: 'Automate order fulfillment and customer notifications',
      description: 'Complete order processing workflow that handles inventory updates, payment processing, shipping notifications, and customer communications.',
      category: 'ECOMMERCE',
      apps: ['Shopify', 'Stripe', 'ShipStation', 'Slack'],
      templateConfig: {
        trigger: { type: 'webhook', path: '/new-order' },
        steps: [
          { type: 'validate-payment', service: 'stripe' },
          { type: 'update-inventory', service: 'shopify' },
          { type: 'create-shipment', service: 'shipstation' },
          { type: 'notify-team', service: 'slack' },
          { type: 'send-confirmation', template: 'order-confirmation' }
        ]
      },
      estimatedSetupMins: 30,
      difficulty: 'Advanced',
      isPublic: true,
      usageCount: 156
    },
    {
      title: 'Social Media Content Scheduler',
      summary: 'Schedule and publish content across multiple platforms',
      description: 'Automatically schedule and publish your content across Twitter, LinkedIn, and Facebook with optimal timing and engagement tracking.',
      category: 'SOCIAL_MEDIA',
      apps: ['Twitter', 'LinkedIn', 'Facebook', 'Buffer'],
      templateConfig: {
        trigger: { type: 'schedule', cron: '0 9,13,17 * * *' },
        steps: [
          { type: 'fetch-content', source: 'content-calendar' },
          { type: 'optimize-timing', service: 'buffer' },
          { type: 'publish-twitter', service: 'twitter-api' },
          { type: 'publish-linkedin', service: 'linkedin-api' },
          { type: 'track-engagement', service: 'analytics' }
        ]
      },
      estimatedSetupMins: 25,
      difficulty: 'Intermediate',
      isPublic: true,
      usageCount: 203
    },
    {
      title: 'Data Backup & Sync',
      summary: 'Automated data backup and synchronization',
      description: 'Keep your important data synchronized across multiple platforms with automated backups and real-time sync capabilities.',
      category: 'DATA_SYNC',
      apps: ['Google Drive', 'Dropbox', 'AWS S3', 'Airtable'],
      templateConfig: {
        trigger: { type: 'schedule', cron: '0 2 * * *' },
        steps: [
          { type: 'fetch-data', sources: ['airtable', 'google-sheets'] },
          { type: 'transform-data', format: 'json' },
          { type: 'backup-s3', bucket: 'data-backups' },
          { type: 'sync-drive', service: 'google-drive' },
          { type: 'notify-completion', service: 'email' }
        ]
      },
      estimatedSetupMins: 35,
      difficulty: 'Advanced',
      isPublic: true,
      usageCount: 134
    },
    {
      title: 'Customer Support Ticket Routing',
      summary: 'Intelligent ticket routing and response automation',
      description: 'Automatically categorize, prioritize, and route customer support tickets to the right team members with AI-powered analysis.',
      category: 'OPERATIONS',
      apps: ['Zendesk', 'Slack', 'OpenAI', 'Gmail'],
      templateConfig: {
        trigger: { type: 'webhook', path: '/new-ticket' },
        steps: [
          { type: 'analyze-content', service: 'openai' },
          { type: 'categorize-ticket', categories: ['technical', 'billing', 'general'] },
          { type: 'assign-priority', levels: ['low', 'medium', 'high', 'urgent'] },
          { type: 'route-ticket', service: 'zendesk' },
          { type: 'notify-team', service: 'slack' }
        ]
      },
      estimatedSetupMins: 40,
      difficulty: 'Advanced',
      isPublic: true,
      usageCount: 178
    }
  ]

  console.log('Creating templates...')
  for (const template of templates) {
    // Check if template already exists
    const existing = await prisma.template.findFirst({
      where: { title: template.title }
    })
    
    if (!existing) {
      await prisma.template.create({
        data: template
      })
      console.log(`✅ Created template: ${template.title}`)
    } else {
      console.log(`⏭️  Template already exists: ${template.title}`)
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Processed ${templates.length} templates`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
