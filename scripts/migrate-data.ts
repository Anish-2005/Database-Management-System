// scripts/migrate-data.ts
// Run with: npx tsx scripts/migrate-data.ts

import mongoose from '../lib/mongoose'
import Tutorial from '../lib/models/Tutorial'
import Resource from '../lib/models/Resource'
import Practice from '../lib/models/Practice'
import { CommunityDiscussion, CommunityMember, CommunityEvent } from '../lib/models/Community'

// Import existing data
import { tutorials } from '../lib/tutorialData'
import { resources } from '../lib/resourcesData'
import { practiceChallenges } from '../lib/practiceData'
import { SAMPLE_DISCUSSIONS, SAMPLE_MEMBERS, SAMPLE_EVENTS } from '../lib/communityData'

async function migrateData() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose
    console.log('✅ Connected to MongoDB\n')

    // Migrate Tutorials
    console.log('📚 Migrating Tutorials...')
    const existingTutorials = await Tutorial.countDocuments()
    if (existingTutorials === 0) {
      const tutorialsData = tutorials.map(t => ({
        ...t,
        icon: 'Database' // Default icon name as string
      }))
      await Tutorial.insertMany(tutorialsData)
      console.log(`✅ Migrated ${tutorialsData.length} tutorials\n`)
    } else {
      console.log(`⚠️  Tutorials already exist (${existingTutorials} found), skipping...\n`)
    }

    // Migrate Resources
    console.log('📖 Migrating Resources...')
    const existingResources = await Resource.countDocuments()
    if (existingResources === 0) {
      const resourcesData = resources.map(r => ({
        ...r,
        icon: 'FileText' // Default icon name as string
      }))
      await Resource.insertMany(resourcesData)
      console.log(`✅ Migrated ${resourcesData.length} resources\n`)
    } else {
      console.log(`⚠️  Resources already exist (${existingResources} found), skipping...\n`)
    }

    // Migrate Practice Challenges
    console.log('💪 Migrating Practice Challenges...')
    const existingPractice = await Practice.countDocuments()
    if (existingPractice === 0) {
      const practiceData = practiceChallenges.map(p => ({
        ...p,
        icon: 'Code' // Default icon name as string
      }))
      await Practice.insertMany(practiceData)
      console.log(`✅ Migrated ${practiceData.length} practice challenges\n`)
    } else {
      console.log(`⚠️  Practice challenges already exist (${existingPractice} found), skipping...\n`)
    }

    // Migrate Community Discussions
    console.log('💬 Migrating Community Discussions...')
    const existingDiscussions = await CommunityDiscussion.countDocuments()
    if (existingDiscussions === 0) {
      await CommunityDiscussion.insertMany(SAMPLE_DISCUSSIONS)
      console.log(`✅ Migrated ${SAMPLE_DISCUSSIONS.length} discussions\n`)
    } else {
      console.log(`⚠️  Discussions already exist (${existingDiscussions} found), skipping...\n`)
    }

    // Migrate Community Members
    console.log('👥 Migrating Community Members...')
    const existingMembers = await CommunityMember.countDocuments()
    if (existingMembers === 0) {
      await CommunityMember.insertMany(SAMPLE_MEMBERS)
      console.log(`✅ Migrated ${SAMPLE_MEMBERS.length} members\n`)
    } else {
      console.log(`⚠️  Members already exist (${existingMembers} found), skipping...\n`)
    }

    // Migrate Community Events
    console.log('📅 Migrating Community Events...')
    const existingEvents = await CommunityEvent.countDocuments()
    if (existingEvents === 0) {
      await CommunityEvent.insertMany(SAMPLE_EVENTS)
      console.log(`✅ Migrated ${SAMPLE_EVENTS.length} events\n`)
    } else {
      console.log(`⚠️  Events already exist (${existingEvents} found), skipping...\n`)
    }

    console.log('🎉 Migration completed successfully!')
    console.log('\n📊 Final Statistics:')
    console.log(`   - Tutorials: ${await Tutorial.countDocuments()}`)
    console.log(`   - Resources: ${await Resource.countDocuments()}`)
    console.log(`   - Practice Challenges: ${await Practice.countDocuments()}`)
    console.log(`   - Discussions: ${await CommunityDiscussion.countDocuments()}`)
    console.log(`   - Members: ${await CommunityMember.countDocuments()}`)
    console.log(`   - Events: ${await CommunityEvent.countDocuments()}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateData()
