import React from 'react';
import { UserIcon, StarIcon, HashIcon, HeartIcon, BookOpenIcon } from 'lucide-react';
export const ProfileScreen = () => {
  return <div className="px-5 py-4">
      <div className="mb-6 flex items-center">
        <div className="w-16 h-16 rounded-full bg-[#B76E79] flex items-center justify-center text-white mr-4">
          <UserIcon size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-medium">Soul Blueprint</h2>
          <p className="text-[#1E1B2E]/60">Your multidimensional identity</p>
        </div>
      </div>
      <div className="mb-8">
        <div className="bg-[#1E1B2E] text-[#FCFCFC] rounded-2xl p-5 shadow-md">
          <div className="flex items-center mb-4">
            <StarIcon size={18} className="text-[#B76E79] mr-2" />
            <h3 className="text-lg font-medium">Astrology</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#FCFCFC]/10 p-3 rounded-xl">
              <p className="text-xs text-[#FCFCFC]/60 mb-1">Sun Sign</p>
              <p className="font-medium">Scorpio</p>
            </div>
            <div className="bg-[#FCFCFC]/10 p-3 rounded-xl">
              <p className="text-xs text-[#FCFCFC]/60 mb-1">Moon Sign</p>
              <p className="font-medium">Pisces</p>
            </div>
            <div className="bg-[#FCFCFC]/10 p-3 rounded-xl">
              <p className="text-xs text-[#FCFCFC]/60 mb-1">Rising</p>
              <p className="font-medium">Virgo</p>
            </div>
            <div className="bg-[#FCFCFC]/10 p-3 rounded-xl">
              <p className="text-xs text-[#FCFCFC]/60 mb-1">Venus</p>
              <p className="font-medium">Libra</p>
            </div>
          </div>
          <button className="w-full py-2 text-sm text-center text-[#FCFCFC]/80 border border-[#FCFCFC]/20 rounded-lg">
            View Full Chart
          </button>
        </div>
      </div>
      <div className="mb-8">
        <div className="bg-[#F8EBDD] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <HeartIcon size={18} className="text-[#B76E79] mr-2" />
            <h3 className="text-lg font-medium">Human Design</h3>
          </div>
          <div className="mb-4">
            <p className="text-xs text-[#1E1B2E]/60 mb-1">Type</p>
            <p className="font-medium text-lg">Projector</p>
            <p className="text-sm mt-1 text-[#1E1B2E]/80">
              You're designed to guide and direct energy. Wait for recognition
              and invitation before sharing your wisdom.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-xs text-[#1E1B2E]/60 mb-1">Authority</p>
              <p className="font-medium">Emotional</p>
            </div>
            <div>
              <p className="text-xs text-[#1E1B2E]/60 mb-1">Profile</p>
              <p className="font-medium">3/5</p>
            </div>
          </div>
          <button className="w-full py-2 text-sm text-center text-[#1E1B2E]/80 border border-[#1E1B2E]/20 rounded-lg">
            Explore Your Design
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#F8EBDD] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center mb-3">
            <HashIcon size={16} className="text-[#B76E79] mr-2" />
            <h3 className="text-base font-medium">Numerology</h3>
          </div>
          <div>
            <p className="text-xs text-[#1E1B2E]/60 mb-1">Life Path</p>
            <p className="font-medium text-xl">4</p>
            <p className="text-xs mt-1 text-[#1E1B2E]/80">
              Builder, foundation creator
            </p>
          </div>
        </div>
        <div className="bg-[#F8EBDD] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center mb-3">
            <BookOpenIcon size={16} className="text-[#B76E79] mr-2" />
            <h3 className="text-base font-medium">Divine Wisdom</h3>
          </div>
          <div>
            <p className="text-xs text-[#1E1B2E]/60 mb-1">Guiding Verse</p>
            <p className="text-xs mt-1 text-[#1E1B2E]/80">
              "And in yourselves. Then will you not see?" - Adh-Dhariyat 51:21
            </p>
          </div>
        </div>
      </div>
    </div>;
};