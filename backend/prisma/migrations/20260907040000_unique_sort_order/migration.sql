-- Ensure no duplicate sortOrder values before unique indexes
-- Renumber within each uniqueness scope (preserves relative order)

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "Stat"
)
UPDATE "Stat" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "Project"
)
UPDATE "Project" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "Experience"
)
UPDATE "Experience" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "Service"
)
UPDATE "Service" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "experienceId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "ExperienceHighlight"
)
UPDATE "ExperienceHighlight" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "TimelineEntry"
)
UPDATE "TimelineEntry" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "Testimonial"
)
UPDATE "Testimonial" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "ContactLink"
)
UPDATE "ContactLink" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "SkillGroup"
)
UPDATE "SkillGroup" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

WITH ranked AS (
  SELECT id,
    (ROW_NUMBER() OVER (PARTITION BY "parentId" ORDER BY "sortOrder" ASC, "createdAt" ASC, id ASC) - 1)::int AS new_order
  FROM "Skill"
)
UPDATE "Skill" AS s
SET "sortOrder" = ranked.new_order
FROM ranked
WHERE s.id = ranked.id;

-- Unique constraints: one sortOrder per list scope
CREATE UNIQUE INDEX "Stat_userId_sortOrder_key" ON "Stat"("userId", "sortOrder");
CREATE UNIQUE INDEX "Project_userId_sortOrder_key" ON "Project"("userId", "sortOrder");
CREATE UNIQUE INDEX "Experience_userId_sortOrder_key" ON "Experience"("userId", "sortOrder");
CREATE UNIQUE INDEX "Service_userId_sortOrder_key" ON "Service"("userId", "sortOrder");
CREATE UNIQUE INDEX "ExperienceHighlight_experienceId_sortOrder_key" ON "ExperienceHighlight"("experienceId", "sortOrder");
CREATE UNIQUE INDEX "TimelineEntry_userId_sortOrder_key" ON "TimelineEntry"("userId", "sortOrder");
CREATE UNIQUE INDEX "Testimonial_userId_sortOrder_key" ON "Testimonial"("userId", "sortOrder");
CREATE UNIQUE INDEX "ContactLink_userId_sortOrder_key" ON "ContactLink"("userId", "sortOrder");
CREATE UNIQUE INDEX "SkillGroup_userId_sortOrder_key" ON "SkillGroup"("userId", "sortOrder");
CREATE UNIQUE INDEX "Skill_parentId_sortOrder_key" ON "Skill"("parentId", "sortOrder");
