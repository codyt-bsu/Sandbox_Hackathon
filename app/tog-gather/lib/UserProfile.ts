/**
 * UserProfile class - stores and manages a user's profile data
 * 
 * This class keeps track of:
 * - name: The user's display name
 * - bio: A short description about the user
 * - xp: Experience points earned (used to level up)
 * - level: Current level (starts at 1)
 * 
 * The class also has methods to calculate XP needed to level up,
 * track progress, and automatically handle level increases.
 */
export class UserProfile {
  name: string;
  bio: string;
  xp: number;
  level: number;

  // Create a new user profile with initial values
  // name: the user's name (required)
  // bio: a short description about the user (required)
  // xp: starting experience points (defaults to 0)
  // level: starting level (defaults to 1)
  constructor(name: string, bio: string, xp: number = 0, level: number = 1) {
    this.name = name;
    this.bio = bio;
    this.xp = xp;
    this.level = level;
  }

  // Returns how much XP is needed to reach the next level
  // Formula: level multiplied by 100
  // Example: Level 5 needs 500 XP to reach level 6
  getXpForNextLevel(): number {
    return 1000 + this.level * 200;
  }

  // Returns how close the user is to the next level, as a percentage (0-100)
  // Example: If you need 500 XP and have 250, this returns 50 (meaning 50% progress)
  getProgressToNextLevel(): number {
    const xpRequired = this.getXpForNextLevel();
    return Math.min((this.xp / xpRequired) * 100, 100);
  }

  // Add XP to the user and automatically level them up if they earn enough
  // Returns the user's new level
  // If XP exceeds the requirement for next level, subtract that XP and increase level by 1
  addXp(amount: number = 0): number {
    this.xp += amount;
    const xpRequired = this.getXpForNextLevel();

    if (this.xp >= xpRequired) {
      this.xp -= xpRequired;
      this.level += 1;
      return this.addXp(); // Check if we need to level up again (in case of large XP gain)
    }

    return this.level;
  }

  // Returns a text summary of the user's profile
  // Format: "Name - Level X | CurrentXP/RequiredXP XP"
  // Example: "Alice - Level 5 | 250/500 XP"
  getSummary(): string {
    return `${this.name} - Level ${this.level} | ${this.xp}/${this.getXpForNextLevel()} XP`;
  }
}
