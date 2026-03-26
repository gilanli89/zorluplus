
-- Delete duplicate MERVESAN (keep the one with SKU)
DELETE FROM inventory WHERE id = 'bc35147e-97fb-4373-acfb-28d33d2ac18c';

-- Update remaining MERVESAN category to "diger"
UPDATE inventory SET category = 'diger' WHERE id = 'd240e263-63ae-4522-8945-48adcac8c9c6';
