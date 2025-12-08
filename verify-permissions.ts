import { getPlanPermissions, isUserInTrial, PLAN_LIMITS } from "./lib/permissions"

const mockProfileFree = { subscription_tier: 'free', trial_ends_at: null }
const mockProfilePro = { subscription_tier: 'pro', trial_ends_at: null }
const mockProfileTrial = { subscription_tier: 'free', trial_ends_at: new Date(Date.now() + 86400000).toISOString() } // Tomorrow
const mockProfileExpiredTrial = { subscription_tier: 'free', trial_ends_at: new Date(Date.now() - 86400000).toISOString() } // Yesterday

console.log("Testing Permissions Logic:")

console.log("Free User:", getPlanPermissions(mockProfileFree).generation_limit === 5 ? "PASS" : "FAIL")
console.log("Pro User:", getPlanPermissions(mockProfilePro).generation_limit === 1000 ? "PASS" : "FAIL")
console.log("Trial User (isInTrial):", isUserInTrial(mockProfileTrial) ? "PASS" : "FAIL")
console.log("Trial User (Permissions):", getPlanPermissions(mockProfileTrial).generation_limit === 1000 ? "PASS" : "FAIL")
console.log("Expired Trial User:", getPlanPermissions(mockProfileExpiredTrial).generation_limit === 5 ? "PASS" : "FAIL")
console.log("Expired Trial User (Can Apply Config):", getPlanPermissions(mockProfileExpiredTrial).saved_configs_access.can_apply === false ? "PASS" : "FAIL")
