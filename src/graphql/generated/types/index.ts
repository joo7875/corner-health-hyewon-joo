import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Appointment = {
  __typename?: 'Appointment';
  appointment_type: AppointmentType;
  attendees?: Maybe<Array<Maybe<User>>>;
  contact_type: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  provider: Provider;
  user?: Maybe<User>;
};

export type AppointmentType = {
  __typename?: 'AppointmentType';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  conversation_memberships: Array<ConversationMembership>;
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notes: Array<Note>;
  updated_at: Scalars['String']['output'];
};

export type ConversationMembership = {
  __typename?: 'ConversationMembership';
  archived?: Maybe<Scalars['Boolean']['output']>;
  conversation_id?: Maybe<Scalars['ID']['output']>;
  convo?: Maybe<Conversation>;
  created_at?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<User>;
  display_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['ID']['output']>;
  viewed?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateNoteInput = {
  content: Scalars['String']['input'];
  conversation_id: Scalars['String']['input'];
};

export type CreateNotePayload = {
  __typename?: 'CreateNotePayload';
  messages: Array<FieldError>;
  note: Note;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type InsurancePlan = {
  __typename?: 'InsurancePlan';
  payer_id?: Maybe<Scalars['ID']['output']>;
  payer_name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<CreateNotePayload>;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String']['output'];
  conversation_id: Scalars['ID']['output'];
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updated_at: Scalars['String']['output'];
  user_id: Scalars['ID']['output'];
};

export type Policy = {
  __typename?: 'Policy';
  id: Scalars['ID']['output'];
  insurance_plan: InsurancePlan;
  num: Scalars['String']['output'];
  priority_type: Scalars['String']['output'];
};

export type Provider = {
  __typename?: 'Provider';
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type Query = {
  __typename?: 'Query';
  appointment: Appointment;
  appointments: Array<Appointment>;
  appointmentsCount: Scalars['Int']['output'];
  conversation: Conversation;
  conversationMemberships: Array<ConversationMembership>;
  conversationMembershipsCount: Scalars['Int']['output'];
};


export type QueryAppointmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAppointmentsArgs = {
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_org?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  should_paginate?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAppointmentsCountArgs = {
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_org?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryConversationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryConversationMembershipsArgs = {
  active_status?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  provider_id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryConversationMembershipsCountArgs = {
  active_status?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  provider_id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar_url?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  policies: Array<Policy>;
};

export type CreateNoteMutationVariables = Exact<{
  content: Scalars['String']['input'];
  conversation_id: Scalars['String']['input'];
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote?: { __typename?: 'CreateNotePayload', note: { __typename?: 'Note', id: string, created_at: string, updated_at: string, content: string }, messages: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> } | null };

export type AppointmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AppointmentQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id: string, date: string, contact_type: string, location: string, provider: { __typename?: 'Provider', id?: string | null, full_name?: string | null }, user?: { __typename?: 'User', id?: string | null, full_name?: string | null, dob?: string | null, policies: Array<{ __typename?: 'Policy', id: string, priority_type: string, num: string, insurance_plan: { __typename?: 'InsurancePlan', payer_id?: string | null, payer_name?: string | null } }> } | null, appointment_type: { __typename?: 'AppointmentType', id?: string | null, name?: string | null } } };

export type AppointmentsQueryVariables = Exact<{
  should_paginate?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AppointmentsQuery = { __typename?: 'Query', appointmentsCount: number, appointments: Array<{ __typename?: 'Appointment', id: string, date: string, contact_type: string, location: string, provider: { __typename?: 'Provider', id?: string | null, full_name?: string | null }, appointment_type: { __typename?: 'AppointmentType', id?: string | null, name?: string | null }, attendees?: Array<{ __typename?: 'User', id?: string | null, full_name?: string | null, dob?: string | null, avatar_url?: string | null, phone_number?: string | null } | null> | null }> };

export type ConversationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ConversationQuery = { __typename?: 'Query', conversation: { __typename?: 'Conversation', id: string, name: string, created_at: string, updated_at: string, conversation_memberships: Array<{ __typename?: 'ConversationMembership', id: string, creator?: { __typename?: 'User', id?: string | null, full_name?: string | null } | null }>, notes: Array<{ __typename?: 'Note', id: string, user_id: string, content: string, created_at: string, updated_at: string }> } };

export type ConversationMembershipsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  active_status?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ConversationMembershipsQuery = { __typename?: 'Query', conversationMembershipsCount: number, conversationMemberships: Array<{ __typename?: 'ConversationMembership', id: string, conversation_id?: string | null, display_name?: string | null, archived?: boolean | null, created_at?: string | null, updated_at?: string | null, user_id?: string | null, viewed?: boolean | null, convo?: { __typename?: 'Conversation', id: string, name: string, updated_at: string, notes: Array<{ __typename?: 'Note', id: string, user_id: string, conversation_id: string, created_at: string, updated_at: string, content: string }>, conversation_memberships: Array<{ __typename?: 'ConversationMembership', creator?: { __typename?: 'User', id?: string | null, full_name?: string | null } | null }> } | null }> };



export const CreateNoteDocument = `
    mutation CreateNote($content: String!, $conversation_id: String!) {
  createNote(input: {content: $content, conversation_id: $conversation_id}) {
    note {
      id
      created_at
      updated_at
      content
    }
    messages {
      field
      message
    }
  }
}
    `;

export const useCreateNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateNoteMutation, TError, CreateNoteMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateNoteMutation, TError, CreateNoteMutationVariables, TContext>(
      {
    mutationKey: ['CreateNote'],
    mutationFn: (variables?: CreateNoteMutationVariables) => fetcher<CreateNoteMutation, CreateNoteMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateNoteDocument, variables)(),
    ...options
  }
    )};

export const AppointmentDocument = `
    query Appointment($id: ID!) {
  appointment(id: $id) {
    id
    date
    contact_type
    location
    provider {
      id
      full_name
    }
    user {
      id
      full_name
      dob
      policies {
        id
        priority_type
        num
        insurance_plan {
          payer_id
          payer_name
        }
      }
    }
    appointment_type {
      id
      name
    }
  }
}
    `;

export const useAppointmentQuery = <
      TData = AppointmentQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: AppointmentQueryVariables,
      options?: Omit<UseQueryOptions<AppointmentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AppointmentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AppointmentQuery, TError, TData>(
      {
    queryKey: ['Appointment', variables],
    queryFn: fetcher<AppointmentQuery, AppointmentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AppointmentDocument, variables),
    ...options
  }
    )};

export const AppointmentsDocument = `
    query Appointments($should_paginate: Boolean, $offset: Int, $is_active: Boolean) {
  appointmentsCount(is_org: true, is_active: $is_active)
  appointments(
    should_paginate: $should_paginate
    offset: $offset
    is_active: $is_active
    is_org: true
  ) {
    id
    date
    contact_type
    location
    provider {
      id
      full_name
    }
    appointment_type {
      id
      name
    }
    attendees {
      id
      full_name
      dob
      avatar_url
      phone_number
    }
  }
}
    `;

export const useAppointmentsQuery = <
      TData = AppointmentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: AppointmentsQueryVariables,
      options?: Omit<UseQueryOptions<AppointmentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AppointmentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AppointmentsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Appointments'] : ['Appointments', variables],
    queryFn: fetcher<AppointmentsQuery, AppointmentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AppointmentsDocument, variables),
    ...options
  }
    )};

export const ConversationDocument = `
    query Conversation($id: ID!) {
  conversation(id: $id) {
    id
    name
    conversation_memberships {
      id
      creator {
        id
        full_name
      }
    }
    notes {
      id
      user_id
      content
      created_at
      updated_at
    }
    created_at
    updated_at
  }
}
    `;

export const useConversationQuery = <
      TData = ConversationQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: ConversationQueryVariables,
      options?: Omit<UseQueryOptions<ConversationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ConversationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ConversationQuery, TError, TData>(
      {
    queryKey: ['Conversation', variables],
    queryFn: fetcher<ConversationQuery, ConversationQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ConversationDocument, variables),
    ...options
  }
    )};

export const ConversationMembershipsDocument = `
    query ConversationMemberships($offset: Int, $active_status: String, $provider_id: ID) {
  conversationMembershipsCount(
    active_status: $active_status
    provider_id: $provider_id
  )
  conversationMemberships(
    offset: $offset
    active_status: $active_status
    provider_id: $provider_id
  ) {
    id
    conversation_id
    display_name
    convo {
      id
      name
      updated_at
      notes {
        id
        user_id
        conversation_id
        created_at
        updated_at
        content
      }
      conversation_memberships {
        creator {
          id
          full_name
        }
      }
    }
    archived
    created_at
    updated_at
    user_id
    viewed
  }
}
    `;

export const useConversationMembershipsQuery = <
      TData = ConversationMembershipsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: ConversationMembershipsQueryVariables,
      options?: Omit<UseQueryOptions<ConversationMembershipsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ConversationMembershipsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ConversationMembershipsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ConversationMemberships'] : ['ConversationMemberships', variables],
    queryFn: fetcher<ConversationMembershipsQuery, ConversationMembershipsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ConversationMembershipsDocument, variables),
    ...options
  }
    )};
