/** @format */
'use client';
import React from 'react';
import { create } from '../../../../../../actions/create-board';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';

const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  return (
    <form action={dispatch}>
      <input
        name="title"
        id="title"
        placeholder="Text herre"
        className="border border-spacing-1 p-1"
      />
      <Button type="submit" size="sm" className="ml-2">
        Submit
      </Button>
    </form>
  );
};

export default Form;
