---
title: "Voice-Controlled AR: Combining YOLOv11, GPT-4o, and Meta Quest 3"
date: "2025-05-10"
excerpt: "A deep dive into the multi-modal pipeline powering our AR hand assistant: real-time object detection, natural language commands, and zero-shot visual classification."
tags: [AR, computer-vision, LLM, meta-quest]
---

Augmented Reality has always promised a future where your environment becomes an interface. This project was our attempt to make that real: a hands-free AR assistant that understands what you're looking at and responds to natural voice commands.

## System Architecture

The pipeline runs on three parallel threads:

### Object Detection (YOLOv11)
We fine-tuned YOLOv11 on a custom dataset of hand-relevant objects (tools, controls, household items) to run at 30fps on the Quest 3's Snapdragon XR2 Gen 2. Bounding boxes are projected into 3D space using the Quest's depth estimation.

### Language Understanding (GPT-4o)
Voice input is transcribed via Whisper and passed to GPT-4o with a structured prompt that includes:
- Current detected objects and their spatial positions
- Recent conversation history
- User's task context

GPT-4o returns a structured action plan that the AR system executes.

### Visual Classification (CLIP + Moondream)
For fine-grained identification ("which of these buttons is the power button?") we combine CLIP's zero-shot classification with Moondream's visual question answering. This lets users ask about visual properties that YOLO's bounding boxes don't capture.

## Meta Quest 3 Integration

The Meta XR SDK's PassThrough API gives us access to the camera feed with minimal latency. We render AR overlays using Unity's URP pipeline with custom shaders for the bounding box visualizations.

The hardest part was achieving sub-100ms end-to-end latency for voice commands. We ended up running YOLOv11 and CLIP on-device and offloading GPT-4o calls to a local server.

## What We Learned

Real-time AR is fundamentally a systems problem. Every millisecond of latency is perceptible, and the Quest 3's thermal constraints mean you can't simply max out every model. We learned to aggressively quantize models and design the pipeline with graceful degradation.

The multimodal combination of vision + language turned out to be more capable than any single model: CLIP could identify objects YOLO had never seen, while GPT-4o could reason about spatial relationships.
