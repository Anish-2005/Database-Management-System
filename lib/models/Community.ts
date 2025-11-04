import mongoose, { Schema, Document } from 'mongoose'

export interface ICommunityDiscussion extends Document {
  id: number
  author: {
    name: string
    avatar: string
    role: string
    reputation: number
  }
  title: string
  content: string
  category: string
  tags: string[]
  likes: number
  comments: number
  views: number
  timestamp: string
  isPinned: boolean
  hasAcceptedAnswer: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICommunityMember extends Document {
  id: number
  name: string
  avatar: string
  role: string
  company: string
  location: string
  bio: string
  reputation: number
  posts: number
  answers: number
  followers: number
  following: number
  badges: string[]
  skills: string[]
  joinDate: string
  social?: {
    github?: string
    twitter?: string
    linkedin?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface ICommunityEvent extends Document {
  id: number
  title: string
  description: string
  type: string
  date: string
  time: string
  duration: string
  host: string
  attendees: number
  maxAttendees: number
  isOnline: boolean
  location?: string
  tags: string[]
  gradient: string
  createdAt: Date
  updatedAt: Date
}

const DiscussionSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    role: { type: String, required: true },
    reputation: { type: Number, required: true }
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  timestamp: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  hasAcceptedAnswer: { type: Boolean, default: false }
}, { timestamps: true })

const MemberSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String, required: true },
  reputation: { type: Number, required: true },
  posts: { type: Number, required: true },
  answers: { type: Number, required: true },
  followers: { type: Number, required: true },
  following: { type: Number, required: true },
  badges: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  joinDate: { type: String, required: true },
  social: {
    github: { type: String },
    twitter: { type: String },
    linkedin: { type: String }
  }
}, { timestamps: true })

const EventSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  host: { type: String, required: true },
  attendees: { type: Number, required: true },
  maxAttendees: { type: Number, required: true },
  isOnline: { type: Boolean, required: true },
  location: { type: String },
  tags: { type: [String], default: [] },
  gradient: { type: String, required: true }
}, { timestamps: true })

export const CommunityDiscussion = mongoose.models.CommunityDiscussion || mongoose.model<ICommunityDiscussion>('CommunityDiscussion', DiscussionSchema)
export const CommunityMember = mongoose.models.CommunityMember || mongoose.model<ICommunityMember>('CommunityMember', MemberSchema)
export const CommunityEvent = mongoose.models.CommunityEvent || mongoose.model<ICommunityEvent>('CommunityEvent', EventSchema)
