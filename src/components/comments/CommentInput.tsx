'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ClientRating as Rating } from '@/components/ui/ClientRating';

import { Textarea } from '@/components/ui/textarea';

import { CommentDto } from '@/types/Comment';

type FormState = {
  userName: string;
  rating: number;
  content: string;
};

const CommentInput = ({
  cardId,
  comment,
}: {
  cardId: string;
  comment?: CommentDto | null;
}) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const router = useRouter();
  const shouldUpdate = !!comment;
  const [formState, setFormState] = useState<FormState>({
    userName: '',
    rating: comment?.rating || 0,
    content: comment?.content || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const createMutation = useMutation(
    async (formData: FormState) => {
      const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          title: '',
          cardId,
        }),
      });
      if (!response.ok) throw new Error('Failed to create comment.');
      return response.json();
    },
    {
      onSuccess: () => {
        // 使评论列表查询失效
        queryClient.invalidateQueries(['comments', cardId]);
      },
    },
  );

  const updateMutation = useMutation(
    async (formData: FormState) => {
      if (!comment?.id) throw new Error('No comment ID provided for update.');
      const response = await fetch(`/api/comments/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cardId,
          commentId: comment.id,
        }),
      });
      if (!response.ok) throw new Error('Failed to update comment.');
      return response.json();
    },
    {
      onSuccess: () => {
        // 使评论列表查询失效
        queryClient.invalidateQueries(['comments', cardId]);
      },
    },
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (shouldUpdate) {
        await updateMutation.mutateAsync(formState);
      } else {
        await createMutation.mutateAsync(formState);
      }
      router.reload();
      // setFormState({ userName: '', rating: comment?.rating || 0, content: comment?.content || '' });
      // upToDateCommentsQuery.refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setFormState({
      userName: '',
      rating: comment?.rating || 0,
      content: comment?.content || '',
    });
  }, [comment]);
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-lg font-bold text-foreground lg:text-xl'>
        {t('Welcome to share your idea')}
      </h2>
      <CommentForm
        onSubmit={onSubmit}
        formState={formState}
        setFormState={setFormState}
        submitting={submitting}
        shouldUpdate={shouldUpdate}
      />
    </div>
  );
};

const CommentForm = ({
  onSubmit,
  formState,
  setFormState,
  submitting,
  shouldUpdate,
}: {
  onSubmit: (e: React.FormEvent) => void;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
  shouldUpdate: boolean;
}) => {
  const { t } = useTranslation();
  const handleRating = (rating: number) => {
    setFormState((prev) => ({ ...prev, rating: rating }));

    // other logic
  };
  return (
    <form
      onSubmit={onSubmit}
      className='flex max-w-2xl flex-col items-start gap-3'
    >
      <Rating
        emptyStyle={{ display: 'flex' }}
        fillStyle={{ display: '-webkit-inline-box' }}
        onClick={handleRating}
        size={24}
        initialValue={formState.rating}
      />
      <Textarea
        className='w-full rounded-lg bg-card px-4 py-2.5 ring-1 ring-border/60 focus-visible:ring-primary/40'
        placeholder='Comment'
        rows={3}
        name='content'
        value={formState.content}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, content: e.target.value }))
        }
      />

      <button
        disabled={submitting}
        className='inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50'
        type='submit'
      >
        {submitting
          ? t('Submitting')
          : shouldUpdate
            ? t('Update')
            : t('Submit')}
      </button>
    </form>
  );
};

export default CommentInput;
