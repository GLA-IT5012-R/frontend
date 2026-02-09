import React from 'react'
import { CustomizerCanvas } from './CustomizerlCanvas'

export function CustomizerSelection({ data }: any): React.ReactElement {
    console.log(data)
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-[600px] border border-gray-200 rounded-lg overflow-hidden">
            {/* Left: 3D Model Canvas */}
            <div className="w-full lg:w-1/2 bg-gray-50 h-[500px] lg:h-auto relative">
                <CustomizerCanvas
                    {...data.asset}
                    textureUrls={data.asset.texture_urls[`${data.asset.type_id}`]}
                    orbitControls={true}
                    className="h-full w-full" />
            </div>

            {/* Right: Customization Parameters */}
            <div className="w-full lg:w-1/2 p-6 bg-white border-l border-gray-200">
                <div className="space-y-4">
                    {/* Placeholder for actual controls */}
                    <div className="text-sm text-gray-500">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
