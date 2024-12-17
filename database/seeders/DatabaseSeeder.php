<?php

namespace Database\Seeders;

use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Enum\PermissionsEnum;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $commentorRole = Role::create(['name' => RolesEnum::Commenter->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $manageFeaturesPermissions = Permission::create(['name'=> PermissionsEnum::ManageFeatures->value]);
        $manageCommentsPermissions = Permission::create(['name'=> PermissionsEnum::ManageComments->value]);
        $manageUsersPermissions = Permission::create(['name'=> PermissionsEnum::ManageUsers->value]);
        $manageUpvoteDownvotePermissions = Permission::create(['name'=> PermissionsEnum::UpvoteDownvote->value]);

        $userRole->syncPermissions([$manageUpvoteDownvotePermissions]);
        $commentorRole->syncPermissions([$manageUpvoteDownvotePermissions, $manageCommentsPermissions]);
        $adminRole->syncPermissions([$manageUpvoteDownvotePermissions, $manageCommentsPermissions, $manageUsersPermissions, $manageFeaturesPermissions]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'Useer@example.com',
        ])->assignRole(RolesEnum::User);

        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'Commenter@example.com',
        ])->assignRole(RolesEnum::Commenter);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'Admin@example.com',
        ])->assignRole(RolesEnum::Admin);
    }
}
