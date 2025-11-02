'use server';

/**
 * @fileOverview This file defines a Genkit flow for task prioritization.
 *
 * It suggests the highest priority task from a list of tasks based on urgency and importance.
 * The flow uses a prompt to analyze task descriptions and determine their priority.
 *
 * @interface TaskPrioritizationInput - The input type for the task prioritization flow.
 * @interface TaskPrioritizationOutput - The output type for the task prioritization flow.
 * @function prioritizeTask - A function that calls the task prioritization flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskPrioritizationInputSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the task.'),
      description: z.string().describe('Detailed description of the task.'),
      urgency: z.number().describe('Urgency level of the task (1-10, 10 being most urgent).'),
      importance: z
        .number()
        .describe('Importance level of the task (1-10, 10 being most important).'),
    })
  ).describe('Array of tasks to prioritize.'),
});
export type TaskPrioritizationInput = z.infer<typeof TaskPrioritizationInputSchema>;

const TaskPrioritizationOutputSchema = z.object({
  suggestedTask: z
    .object({
      id: z.string().describe('The ID of the suggested task.'),
      reason: z.string().describe('The reasoning behind the task suggestion.'),
    })
    .describe('The task with the highest priority.'),
});
export type TaskPrioritizationOutput = z.infer<typeof TaskPrioritizationOutputSchema>;

export async function prioritizeTask(input: TaskPrioritizationInput): Promise<TaskPrioritizationOutput> {
  return prioritizeTaskFlow(input);
}

const prioritizeTaskPrompt = ai.definePrompt({
  name: 'prioritizeTaskPrompt',
  input: {schema: TaskPrioritizationInputSchema},
  output: {schema: TaskPrioritizationOutputSchema},
  prompt: `You are an AI assistant designed to prioritize tasks based on their description, urgency, and importance.

Given the following list of tasks, analyze each task and determine which one should be done first.
Consider both urgency and importance when making your decision. Provide a brief reason for your suggestion.

Tasks:
{{#each tasks}}
  - ID: {{this.id}}
    Description: {{this.description}}
    Urgency: {{this.urgency}}
    Importance: {{this.importance}}
{{/each}}


Based on the provided information, the highest priority task is:

Task ID: {{suggestedTask.id}}
Reason: {{suggestedTask.reason}}`,
});

const prioritizeTaskFlow = ai.defineFlow(
  {
    name: 'prioritizeTaskFlow',
    inputSchema: TaskPrioritizationInputSchema,
    outputSchema: TaskPrioritizationOutputSchema,
  },
  async input => {
    // Simple logic to determine the highest priority task based on urgency and importance.
    let bestTask = input.tasks[0];
    let bestScore = bestTask.urgency + bestTask.importance;

    for (const task of input.tasks) {
      const score = task.urgency + task.importance;
      if (score > bestScore) {
        bestScore = score;
        bestTask = task;
      }
    }

    const promptInput = {
      ...input,
      suggestedTask: {
        id: bestTask.id,
        reason: `This task has the highest combined urgency and importance score (${bestTask.urgency} urgency + ${bestTask.importance} importance = ${bestScore}).`,
      },
    };

    const {output} = await prioritizeTaskPrompt(promptInput);
    return output!;
  }
);
