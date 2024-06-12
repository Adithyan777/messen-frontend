'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function Version2() {
    
  return (
    <>
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <h1 className="text-primary scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-center">Control Valve Sizing Tool</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary scroll-m-20 text-2xl font-bold tracking-tight">Medium Data</CardTitle>
            <CardDescription>Enter the details about your fluid properties.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="density">Density</Label>
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <Select id="density-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lb/ft3">lb/ft³</SelectItem>
                        <SelectItem value="kg/m3">kg/m³</SelectItem>
                        <SelectItem value="g/cm3">g/cm³</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/4">
                    <Input id="density" type="number" placeholder="62.4" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vapor-pressure">Vapor Pressure</Label>
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <Select id="vapor-pressure-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="psi">PSI</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="kpa">kPa</SelectItem>
                        <SelectItem value="mmhg">mmHg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/4">
                    <Input id="vapor-pressure" type="number" placeholder="0.3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="critical-pressure">Critical Pressure</Label>
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <Select id="critical-pressure-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="psi">PSI</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="kpa">kPa</SelectItem>
                        <SelectItem value="mpa">MPa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/4">
                    <Input id="critical-pressure" type="number" placeholder="3000" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="viscosity">Viscosity</Label>
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <Select id="viscosity-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cp">cP</SelectItem>
                        <SelectItem value="pa-s">Pa·s</SelectItem>
                        <SelectItem value="lb/ft-s">lb/ft·s</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/4">
                    <Input id="viscosity" type="number" placeholder="0.89" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-primary scroll-m-20 text-2xl font-bold tracking-tight">Process Data</CardTitle>
            <CardDescription>Enter the details about your process conditions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="flow-rate">Flow Rate</Label>
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <Select id="flow-rate-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpm">GPM</SelectItem>
                        <SelectItem value="lpm">LPM</SelectItem>
                        <SelectItem value="cfm">CFM</SelectItem>
                        <SelectItem value="m3h">m³/h</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/4">
                    <Input id="flow-rate" type="number" placeholder="100" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inlet-pressure">Inlet Pressure</Label>
                <div className="flex items-center gap-2">
                  <div className="w-2/5">
                    <Select id="inlet-pressure-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="psi">PSI</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="kpa">kPa</SelectItem>
                        <SelectItem value="mpa">MPa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/5">
                    <Input id="inlet-pressure" type="number" placeholder="100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="outlet-pressure">Outlet Pressure</Label>
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <Select id="outlet-pressure-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="psi">PSI</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="kpa">kPa</SelectItem>
                        <SelectItem value="mpa">MPa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/4">
                    <Input id="outlet-pressure" type="number" placeholder="90" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <Select id="temperature-unit">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="f">°F</SelectItem>
                        <SelectItem value="c">°C</SelectItem>
                        <SelectItem value="k">K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-3/4">
                    <Input id="temperature" type="number" placeholder="70" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}