import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { users, candidates } from "@/drizzle/schema";
import { ENV } from './env';
let _db = null;
// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
    if (!_db && process.env.DATABASE_URL) {
        try {
            _db = drizzle(process.env.DATABASE_URL);
        }
        catch (error) {
            console.warn("[Database] Failed to connect:", error);
            _db = null;
        }
    }
    return _db;
}
export async function upsertUser(user) {
    if (!user.id) {
        throw new Error("User ID is required for upsert");
    }
    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot upsert user: database not available");
        return;
    }
    try {
        const values = {
            id: user.id,
        };
        const updateSet = {};
        const textFields = ["name", "email", "loginMethod"];
        const assignNullable = (field) => {
            const value = user[field];
            if (value === undefined)
                return;
            const normalized = value ?? null;
            values[field] = normalized;
            updateSet[field] = normalized;
        };
        textFields.forEach(assignNullable);
        if (user.lastSignedIn !== undefined) {
            values.lastSignedIn = user.lastSignedIn;
            updateSet.lastSignedIn = user.lastSignedIn;
        }
        if (user.role === undefined) {
            if (user.id === ENV.ownerId) {
                user.role = 'admin';
                values.role = 'admin';
                updateSet.role = 'admin';
            }
        }
        if (Object.keys(updateSet).length === 0) {
            updateSet.lastSignedIn = new Date();
        }
        await db.insert(users).values(values).onDuplicateKeyUpdate({
            set: updateSet,
        });
    }
    catch (error) {
        console.error("[Database] Failed to upsert user:", error);
        throw error;
    }
}
export async function getUser(id) {
    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot get user: database not available");
        return undefined;
    }
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}
export async function createCandidate(data) {
    const db = await getDb();
    if (!db) {
        throw new Error("Database not available");
    }
    try {
        // Build insert object with only provided fields
        const insertData = {
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            profession: data.profession,
            stage: "application_review",
            status: "pending",
            isArchived: false,
            // Database will handle appliedAt and updatedAt defaults
        };
        // Add optional fields only if provided
        if (data.phone)
            insertData.phone = data.phone;
        if (data.yearsExperience !== undefined)
            insertData.yearsExperience = data.yearsExperience;
        if (data.specializations)
            insertData.specializations = data.specializations;
        if (data.equipment)
            insertData.equipment = data.equipment;
        if (data.hasMobileExperience !== undefined)
            insertData.hasMobileExperience = data.hasMobileExperience;
        if (data.availability)
            insertData.availability = data.availability;
        if (data.cvUrl)
            insertData.cvUrl = data.cvUrl;
        if (data.insuranceUrl)
            insertData.insuranceUrl = data.insuranceUrl;
        // Note: insuranceDetails is not in the database schema, so we skip it
        await db.insert(candidates).values(insertData);
        // Fetch and return the created candidate
        const result = await db.select().from(candidates).where(eq(candidates.id, data.id)).limit(1);
        if (result.length === 0) {
            throw new Error("Failed to retrieve created candidate");
        }
        return result[0];
    }
    catch (error) {
        console.error("[Database] Failed to create candidate:", error);
        throw error;
    }
}
export async function getCandidates(filters) {
    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot get candidates: database not available");
        return [];
    }
    try {
        // Build query with filters
        if (filters?.archived !== undefined) {
            const result = await db.select().from(candidates).where(eq(candidates.isArchived, filters.archived));
            return result;
        }
        const result = await db.select().from(candidates);
        return result;
    }
    catch (error) {
        console.error("[Database] Failed to get candidates:", error);
        return [];
    }
}
export async function getCandidateById(id) {
    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot get candidate: database not available");
        return undefined;
    }
    try {
        const result = await db.select().from(candidates).where(eq(candidates.id, id)).limit(1);
        return result.length > 0 ? result[0] : undefined;
    }
    catch (error) {
        console.error("[Database] Failed to get candidate:", error);
        return undefined;
    }
}
export async function getAllCandidates(includeArchived = false) {
    if (includeArchived) {
        return getCandidates({});
    }
    return getCandidates({ archived: false });
}
export async function updateCandidate(id, data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    try {
        await db.update(candidates).set(data).where(eq(candidates.id, id));
        return getCandidateById(id);
    }
    catch (error) {
        console.error("[Database] Failed to update candidate:", error);
        throw error;
    }
}
export async function archiveCandidate(id) {
    return updateCandidate(id, { isArchived: true });
}
export async function getAllEmailTemplates() {
    return [];
}
export async function getEmailTemplateById(_id) {
    return null;
}
export async function createEmailTemplate(_data) {
    return null;
}
export async function getEmailHistoryForCandidate(_candidateId) {
    return [];
}
export async function createEmailHistory(_data) {
    return null;
}
export async function updateEmailTemplate(_id, _data) {
    return _data;
}
export async function deleteEmailTemplate(id) {
    return { id };
}
