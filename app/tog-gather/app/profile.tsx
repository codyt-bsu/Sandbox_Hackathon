// This file needs 'use client' because it uses React hooks (useState) for interactivity
'use client';

import { UserProfile } from '@/lib/UserProfile';
import { useState } from 'react';

// ============================================================================
// PROFILE.TSX - User Profile Display Page
// ============================================================================
// This page shows user profiles with:
// - ProfileCard: A reusable component that displays one user's info
// - ProfilePage: The main page that shows multiple profiles and lets users
//   interact with one to add XP and level up
//
// The page uses Tailwind CSS for styling and supports dark mode.
// ============================================================================

/**
 * ProfileCard - A component that displays a single user's profile
 * Shows: name, bio, level badge, and XP progress bar
 */
export function ProfileCard({ profile }: { profile: UserProfile }) {
  // profile: a UserProfile object containing all the user's data
  return (
    <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      {/* Display the user's name and bio */}
      <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
        {profile.name}
      </h2>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        {profile.bio}
      </p>

      {/* Show the user's current level with a badge */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Level {profile.level}
        </span>
        <span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
          LV {profile.level}
        </span>
      </div>

      {/* Show XP progress bar - fills up as the user gains XP toward next level */}
      <div className="mb-2">
        <div className="mb-2 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
          <span>Experience</span>
          <span>
            {profile.xp} / {profile.getXpForNextLevel()} XP
          </span>
        </div>
        {/* The bar width is based on the percentage progress to next level */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${profile.getProgressToNextLevel()}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        {Math.round(profile.getProgressToNextLevel())}% to next level
      </p>
    </div>
  );
}

/**
 * ProfilePage - Main page showing multiple user profiles
 * 
 * Demonstrates:
 * 1. Static profiles: Shows two sample profiles that don't change
 * 2. Interactive profile: Shows one profile that the user can add XP to
 * 
 * When the user clicks "Add 100 XP", the interactive profile updates
 * and automatically levels up if the XP threshold is reached.
 */
export default function ProfilePage() {
  // Create example user profiles using useState hook (React's state management)
  // profile1 and profile2 don't use setState because they never change
  const [profile1] = useState(
    new UserProfile(
      'Alex Chen',
      'Full-stack developer passionate about open source',
      750,
      5
    )
  );

  const [profile2] = useState(
    new UserProfile(
      'Jordan Smith',
      'UI/UX designer with a love for web technologies',
      1200,
      8
    )
  );

  // profile3 uses both profile3 and setProfile3 because the user can change it
  // setProfile3 is used to update the profile when user adds XP
  const [profile3, setProfile3] = useState(
    new UserProfile('Casey Johnson', 'Hackathon enthusiast', 250, 2)
  );

  // Function called when user clicks the "Add 100 XP" button
  // This adds 100 XP to profile3 and handles automatic level-up
  const handleAddXp = () => {
    // Create a new profile with 100 more XP than before
    const newProfile = new UserProfile(
      profile3.name,
      profile3.bio,
      profile3.xp + 100,  // Add 100 XP
      profile3.level
    );
    
    // Check if the new XP amount is enough to level up
    if (newProfile.xp >= profile3.getXpForNextLevel()) {
      // If so, increase level and subtract the XP cost from total XP
      newProfile.level = profile3.level + 1;
      newProfile.xp -= profile3.getXpForNextLevel();
    }
    
    // Update the profile state to trigger a re-render with new data
    setProfile3(newProfile);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-12 text-4xl font-bold text-zinc-900 dark:text-white">
          User Profiles
        </h1>

        {/* Display the two static example profiles side by side */}
        <div className="mb-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          <ProfileCard profile={profile1} />
          <ProfileCard profile={profile2} />
        </div>

        {/* Section where user can interact with a profile (add XP and level up) */}
        <div className="rounded-lg border border-zinc-300 bg-zinc-100 p-8 dark:border-zinc-600 dark:bg-zinc-800">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
            Interactive Profile
          </h2>
          <div className="mb-6">
            <ProfileCard profile={profile3} />
          </div>
          <button
            onClick={handleAddXp}
            className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600 active:bg-blue-700"
          >
            Add 100 XP
          </button>
        </div>
      </div>
    </div>
  );
}
