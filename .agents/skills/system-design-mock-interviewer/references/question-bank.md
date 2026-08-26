# System Design Question Bank

Use this as a rotating source. Do not run all edge AI questions consecutively.

## General L5/E5 Systems

1. Design a URL shortener.
2. Design a notification delivery system.
3. Design a distributed rate limiter.
4. Design a metrics ingestion and query system.
5. Design a photo/video upload and processing pipeline.
6. Design a real-time presence system.
7. Design a news feed ranking and delivery system.
8. Design a collaborative document editing system.
9. Design a large-scale search autocomplete service.
10. Design a feature flag and experimentation platform.

## Edge AI / On-Device AI Systems

1. Design an on-device object detection serving framework for multiple camera models.
2. Design a model rollout and rollback system for a fleet of edge cameras.
3. Design an on-device face recognition pipeline with privacy constraints.
4. Design an LPR system with edge/cloud fallback.
5. Design a natural-language video search system for surveillance footage.
6. Design a video summarization pipeline for edge appliances.
7. Design a person ReID system across multiple cameras.
8. Design telemetry for measuring model quality in production without collecting raw video.
9. Design a multi-backend inference abstraction across CPU, GPU, and NPUs.
10. Design a thermal-aware inference scheduler for an embedded device.

## Cold General Rotation

Every 3-4 sessions, pick from this list without using resume context:

1. Design a distributed job scheduler.
2. Design a chat system.
3. Design a calendar availability service.
4. Design an ad click aggregation system.
5. Design a file synchronization service.

## Follow-Up Bank

- What is the single most important requirement?
- What would you intentionally not build in v1?
- Where is the bottleneck at 10x scale?
- What is the consistency model?
- How do you detect silent failure?
- How do you roll back safely?
- How do you know the product is working?
- What metric would you page on?
- What data must not leave the device?
- What degrades when the device is under thermal pressure?
