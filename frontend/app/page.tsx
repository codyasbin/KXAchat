'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md"
      >
        <SignedIn>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Welcome to KXA Messenger!
            </h1>
            <p className="text-gray-600 mt-4">
              KXA chat app to connect with the world.
            </p>
            <Link
              href="/chat"
              className="inline-block mt-6 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Go to Chat
            </Link>
            <div className="mt-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </motion.div>
        </SignedIn>

        <SignedOut>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Welcome to KXA Messenger!
            </h1>
            <p className="text-gray-600 mt-4">
              Please sign in to start chatting with friends.
            </p>
            <div className="mt-6">
              <SignInButton>
                <button className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </motion.div>
        </SignedOut>
      </motion.div>
    </main>
  );
}
