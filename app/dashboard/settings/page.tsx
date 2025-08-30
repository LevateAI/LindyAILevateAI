"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Users,
  Key,
  Smartphone,
  Mail,
  Globe,
  Trash2,
  Upload,
  Save,
  AlertTriangle
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    role: "Marketing Director",
    bio: "Passionate about automation and efficiency. Love building workflows that save time and improve productivity.",
    timezone: "America/New_York",
    language: "en"
  })

  const [notifications, setNotifications] = useState({
    emailWorkflowSuccess: true,
    emailWorkflowFailure: true,
    emailWeeklyReport: true,
    emailProductUpdates: false,
    pushWorkflowSuccess: false,
    pushWorkflowFailure: true,
    pushMaintenance: true,
    smsFailureAlerts: true
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    sessionTimeout: "24",
    loginNotifications: true,
    apiKeyRotation: "90"
  })

  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@acme.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@acme.com",
      role: "Editor",
      status: "Active",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@acme.com",
      role: "Viewer",
      status: "Pending",
      lastActive: "Never"
    }
  ])

  const handleProfileUpdate = () => {
    // Handle profile update
    console.log("Updating profile:", profile)
  }

  const handleNotificationUpdate = () => {
    // Handle notification preferences update
    console.log("Updating notifications:", notifications)
  }

  const handleSecurityUpdate = () => {
    // Handle security settings update
    console.log("Updating security:", security)
  }

  const handleInviteTeamMember = () => {
    // Handle team member invitation
    console.log("Inviting team member")
  }

  const handleRemoveTeamMember = (memberId: number) => {
    // Handle team member removal
    console.log("Removing team member:", memberId)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/api/placeholder/80/80" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={profile.language} onValueChange={(value) => setProfile({...profile, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleProfileUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what email notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workflow Success</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when workflows complete successfully
                  </p>
                </div>
                <Switch
                  checked={notifications.emailWorkflowSuccess}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailWorkflowSuccess: checked})}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workflow Failures</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when workflows fail or encounter errors
                  </p>
                </div>
                <Switch
                  checked={notifications.emailWorkflowFailure}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailWorkflowFailure: checked})}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly summaries of your automation activity
                  </p>
                </div>
                <Switch
                  checked={notifications.emailWeeklyReport}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailWeeklyReport: checked})}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Product Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about new features and improvements
                  </p>
                </div>
                <Switch
                  checked={notifications.emailProductUpdates}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailProductUpdates: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Manage your browser and mobile push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workflow Failures</Label>
                  <p className="text-sm text-muted-foreground">
                    Immediate alerts for critical workflow failures
                  </p>
                </div>
                <Switch
                  checked={notifications.pushWorkflowFailure}
                  onCheckedChange={(checked) => setNotifications({...notifications, pushWorkflowFailure: checked})}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about scheduled maintenance
                  </p>
                </div>
                <Switch
                  checked={notifications.pushMaintenance}
                  onCheckedChange={(checked) => setNotifications({...notifications, pushMaintenance: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>
                Critical alerts sent to your phone number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Critical Failure Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    SMS alerts for critical system failures
                  </p>
                </div>
                <Switch
                  checked={notifications.smsFailureAlerts}
                  onCheckedChange={(checked) => setNotifications({...notifications, smsFailureAlerts: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleNotificationUpdate}>
            <Save className="mr-2 h-4 w-4" />
            Save Notification Preferences
          </Button>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable 2FA</Label>
                  <p className="text-sm text-muted-foreground">
                    Use an authenticator app for additional security
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={security.twoFactorEnabled ? "default" : "secondary"}>
                    {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <Switch
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurity({...security, twoFactorEnabled: checked})}
                  />
                </div>
              </div>
              {security.twoFactorEnabled && (
                <Alert>
                  <Smartphone className="h-4 w-4" />
                  <AlertDescription>
                    Two-factor authentication is active. Use your authenticator app to generate codes when signing in.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Control how long you stay signed in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                <Select value={security.sessionTimeout} onValueChange={(value) => setSecurity({...security, sessionTimeout: value})}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                    <SelectItem value="720">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of new sign-ins to your account
                  </p>
                </div>
                <Switch
                  checked={security.loginNotifications}
                  onCheckedChange={(checked) => setSecurity({...security, loginNotifications: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password & Recovery</CardTitle>
              <CardDescription>
                Manage your password and account recovery options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">
                Change Password
              </Button>
              <Button variant="outline">
                Download Recovery Codes
              </Button>
            </CardContent>
          </Card>

          <Button onClick={handleSecurityUpdate}>
            <Save className="mr-2 h-4 w-4" />
            Save Security Settings
          </Button>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage who has access to your workspace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium">Invite team members</h4>
                  <p className="text-sm text-muted-foreground">
                    Add new members to collaborate on workflows
                  </p>
                </div>
                <Button onClick={handleInviteTeamMember}>
                  <Mail className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </div>
              <Separator />
              <div className="space-y-4">
                {team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {member.role} • {member.lastActive}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTeamMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Keep your API keys secure. Don't share them in publicly accessible areas.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Production API Key</p>
                    <p className="text-sm text-muted-foreground">
                      Created on Jan 15, 2024 • Last used 2 hours ago
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      lv_prod_••••••••••••••••
                    </code>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Development API Key</p>
                    <p className="text-sm text-muted-foreground">
                      Created on Jan 10, 2024 • Last used 1 day ago
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      lv_dev_••••••••••••••••
                    </code>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button>
                <Key className="mr-2 h-4 w-4" />
                Create New API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
